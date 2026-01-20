import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { patientApi } from '@/lib/api';
import { PatientProfile } from '@/types/vitals';
import { API_CONFIG } from '@/lib/config';

const MOCK_PATIENT: PatientProfile = {
  id: '1',
  name: 'Umair Hakeem',
  age: 24,
  gender: 'Male',
  bloodType: 'O+',
  conditions: [],
  medications: [],
  emergencyContacts: [
    {
      name: 'Dr. Ahmed Khan',
      phone: '+92 300 1234567',
      relation: 'Primary Care Physician',
      type: 'doctor',
    },
    {
      name: 'Awais',
      phone: '03145647685',
      relation: 'Brother',
      type: 'family',
    },
  ],
};

export const usePatient = (patientId: string, useMockData: boolean = API_CONFIG.useMockData) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['patient', patientId],
    queryFn: async () => {
      if (useMockData) {
        return MOCK_PATIENT;
      }
      return patientApi.getProfile(patientId);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return {
    patient: data || MOCK_PATIENT,
    isLoading,
    error,
  };
};
