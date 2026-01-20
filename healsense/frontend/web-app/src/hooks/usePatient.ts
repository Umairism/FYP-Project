import { useQuery } from '@tanstack/react-query';
import { patientApi } from '@/lib/api';
import { PatientProfile } from '@/types/vitals';

// Mock patient for development (when backend is not available)
const MOCK_PATIENT: PatientProfile = {
  id: '1',
  name: 'John Anderson',
  age: 54,
  gender: 'Male',
  bloodType: 'O+',
  conditions: ['Hypertension', 'Type 2 Diabetes'],
  medications: ['Metformin 500mg', 'Lisinopril 10mg'],
  emergencyContact: {
    name: 'Dr. Sarah Johnson',
    phone: '+1 (555) 123-4567',
    relation: 'Primary Care Physician',
  },
};

export const usePatient = (patientId: string, useMockData: boolean = false) => {
  return useQuery<PatientProfile>({
    queryKey: ['patient', patientId],
    queryFn: async () => {
      if (useMockData) {
        // Return mock data in development
        return MOCK_PATIENT;
      }
      return patientApi.getProfile(patientId);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
