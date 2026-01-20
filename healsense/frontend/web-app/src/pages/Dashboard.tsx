import { useState, useEffect } from 'react';
import { useVitals, getVitalStatus } from '@/hooks/useVitals';
import { usePatient } from '@/hooks/usePatient';
import { API_CONFIG } from '@/lib/config';
import { VitalCard } from '@/components/VitalCard';
import { TrendChart } from '@/components/TrendChart';
import { AlertBanner } from '@/components/AlertBanner';
import { HistoryTable } from '@/components/HistoryTable';
import { PatientHeader } from '@/components/PatientHeader';
import { EmergencyButton } from '@/components/EmergencyButton';
import { SettingsDialog } from '@/components/SettingsDialog';
import { ProfileDialog } from '@/components/ProfileDialog';
import { AlertsDialog } from '@/components/AlertsDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Heart,
  Wind,
  Thermometer,
  Activity,
  Droplets,
  LayoutDashboard,
  LineChart,
  Clock,
} from 'lucide-react';

// TODO: Replace with actual patient ID from auth/routing
const PATIENT_ID = '1';

export const Dashboard = () => {
  const {
    currentReading,
    readings,
    alerts,
    isConnected,
    acknowledgeAlert,
    dismissAlert,
  } = useVitals({ 
    patientId: PATIENT_ID, 
    useMockData: API_CONFIG.useMockData 
  });

  const { data: patient, isLoading: isLoadingPatient } = usePatient(
    PATIENT_ID, 
    API_CONFIG.useMockData
  );

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged);

  if (!currentReading || isLoadingPatient || !patient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-muted-foreground">Loading vitals...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PatientHeader
        patient={patient}
        isConnected={isConnected}
        alertCount={unacknowledgedAlerts.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAlerts={() => setIsAlertsOpen(true)}
      />

      <main className="container py-6 space-y-6">
        {/* Alert Banner */}
        <AlertBanner
          alerts={alerts}
          onAcknowledge={acknowledgeAlert}
          onDismiss={dismissAlert}
        />

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="gap-2">
              <LineChart className="w-4 h-4" />
              <span className="hidden sm:inline">Trends</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            {/* Vital Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <VitalCard
                title="Heart Rate"
                value={currentReading.heartRate}
                unit="bpm"
                status={getVitalStatus('heartRate', currentReading.heartRate)}
                icon={<Heart className="w-5 h-5" />}
                trend="stable"
              />
              <VitalCard
                title="Blood Oxygen (SpO₂)"
                value={currentReading.spo2}
                unit="%"
                status={getVitalStatus('spo2', currentReading.spo2)}
                icon={<Droplets className="w-5 h-5" />}
                trend="stable"
              />
              <VitalCard
                title="Temperature"
                value={currentReading.temperature}
                unit="°C"
                status={getVitalStatus('temperature', currentReading.temperature)}
                icon={<Thermometer className="w-5 h-5" />}
                trend="stable"
              />
              <VitalCard
                title="Blood Pressure"
                value={`${currentReading.systolic}/${currentReading.diastolic}`}
                unit="mmHg"
                status={getVitalStatus('systolic', currentReading.systolic)}
                icon={<Activity className="w-5 h-5" />}
                secondaryValue="Systolic / Diastolic"
              />
              <VitalCard
                title="Respiratory Rate"
                value={currentReading.respiratoryRate}
                unit="/min"
                status={getVitalStatus('respiratoryRate', currentReading.respiratoryRate)}
                icon={<Wind className="w-5 h-5" />}
                trend="stable"
              />
            </div>

            {/* Quick Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TrendChart
                title="Heart Rate"
                data={readings}
                dataKey="heartRate"
                color="hsl(var(--chart-1))"
                unit="bpm"
                thresholds={{ warningMin: 50, warningMax: 100 }}
              />
              <TrendChart
                title="Blood Oxygen"
                data={readings}
                dataKey="spo2"
                color="hsl(var(--chart-2))"
                unit="%"
                thresholds={{ warningMin: 95 }}
              />
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TrendChart
                title="Heart Rate"
                data={readings}
                dataKey="heartRate"
                color="hsl(var(--chart-1))"
                unit="bpm"
                thresholds={{ warningMin: 50, warningMax: 100 }}
              />
              <TrendChart
                title="Blood Oxygen (SpO₂)"
                data={readings}
                dataKey="spo2"
                color="hsl(var(--chart-2))"
                unit="%"
                thresholds={{ warningMin: 95 }}
              />
              <TrendChart
                title="Temperature"
                data={readings}
                dataKey="temperature"
                color="hsl(var(--chart-3))"
                unit="°C"
                thresholds={{ warningMin: 36, warningMax: 37.5 }}
              />
              <TrendChart
                title="Systolic Blood Pressure"
                data={readings}
                dataKey="systolic"
                color="hsl(var(--chart-4))"
                unit="mmHg"
                thresholds={{ warningMin: 100, warningMax: 140 }}
              />
              <TrendChart
                title="Diastolic Blood Pressure"
                data={readings}
                dataKey="diastolic"
                color="hsl(var(--chart-5))"
                unit="mmHg"
                thresholds={{ warningMin: 60, warningMax: 90 }}
              />
              <TrendChart
                title="Respiratory Rate"
                data={readings}
                dataKey="respiratoryRate"
                color="hsl(var(--chart-1))"
                unit="/min"
                thresholds={{ warningMin: 12, warningMax: 20 }}
              />
            </div>
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <HistoryTable readings={readings} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Emergency Button */}
      <EmergencyButton />

      {/* Dialogs */}
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      <ProfileDialog
        open={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        patient={patient}
      />
      <AlertsDialog
        open={isAlertsOpen}
        onOpenChange={setIsAlertsOpen}
        alerts={alerts}
        onAcknowledge={acknowledgeAlert}
        onDismiss={dismissAlert}
      />
    </div>
  );
};

export default Dashboard;
