// src/utils/api.ts
import axios from 'axios';
import { ConceptPayload } from '../types';

const API_BASE = 'http://localhost:5000';

export const addConcept = async (payload: ConceptPayload) => {
  const response = await axios.post(`${API_BASE}/add-concept`, payload);
  return response.data;
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_BASE}/upload-data`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const fetchGraph = async () => {
  const response = await axios.get(`${API_BASE}/graph`);
  return response.data;
};

export const queryDiagnoses = async (symptom: string) => {
  const response = await axios.get(`${API_BASE}/query/diagnoses-for-symptom`, {
    params: { symptom },
  });
  return response.data;
};

export const queryTreatments = async (disease: string) => {
  const response = await axios.get(`${API_BASE}/query/treatments-for-disease`, {
    params: { disease },
  });
  return response.data;
};

export const querySpecialists = async (entity: string) => {
  const response = await axios.get(`${API_BASE}/query/specialists-for-entity`, {
    params: { entity },
  });
  return response.data;
};
