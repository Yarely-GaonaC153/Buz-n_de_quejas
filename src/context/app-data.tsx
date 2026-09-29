import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';

export type ReportDraft = {
  id: string;
  title: string;
  description: string;
  address: string;
  latitude?: number;
  longitude?: number;
  photoUri?: string;
  proposal?: string;
  status: 'En revisión' | 'Asignado';
  createdAt: string;
  estimatedCost?: number;
};

type AppData = {
  reports: ReportDraft[];
  draft: Partial<ReportDraft>;
  updateDraft: (values: Partial<ReportDraft>) => void;
  submitReport: () => Promise<ReportDraft>;
};

const AppDataContext = createContext<AppData | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<ReportDraft[]>([]);
  const [draft, setDraft] = useState<Partial<ReportDraft>>({});
  const [storageLoaded, setStorageLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('ciudad-activa-reports').then(async (stored) => {
      if (supabase) {
        const { data } = await supabase.from('reports').select('*').order('created_at', { ascending: false });
        if (data) setReports(data.map((item) => ({ id: item.id, title: item.title, description: item.description, address: item.address, latitude: item.latitude, longitude: item.longitude, photoUri: item.photo_url, proposal: item.proposal, status: item.status, createdAt: item.created_at, estimatedCost: item.estimated_cost })) as ReportDraft[]);
      } else if (stored) setReports(JSON.parse(stored) as ReportDraft[]);
      setStorageLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (storageLoaded) AsyncStorage.setItem('ciudad-activa-reports', JSON.stringify(reports));
  }, [reports, storageLoaded]);

  const updateDraft = (values: Partial<ReportDraft>) => setDraft((current) => ({ ...current, ...values }));
  const submitReport = async () => {
    let photoUrl = draft.photoUri;
    if (supabase && draft.photoUri && !draft.photoUri.startsWith('http')) {
      const file = await fetch(draft.photoUri);
      const fileData = await file.arrayBuffer();
      const path = `${Date.now()}.jpg`;
      const upload = await supabase.storage.from('report-photos').upload(path, fileData, { contentType: 'image/jpeg', upsert: false });
      if (upload.error) throw upload.error;
      photoUrl = supabase.storage.from('report-photos').getPublicUrl(path).data.publicUrl;
    }
    const report: ReportDraft = {
      id: `${Date.now()}`,
      title: draft.title || 'Reporte ciudadano',
      description: draft.description || 'Sin descripción',
      address: draft.address || 'Ubicación no especificada',
      latitude: draft.latitude,
      longitude: draft.longitude,
      photoUri: photoUrl,
      proposal: draft.proposal,
      status: 'En revisión',
      createdAt: new Date().toLocaleDateString('es-MX'),
      estimatedCost: draft.estimatedCost,
    };
    if (supabase) {
      const { data, error } = await supabase.from('reports').insert({ title: report.title, description: report.description, address: report.address, latitude: report.latitude, longitude: report.longitude, photo_url: report.photoUri, proposal: report.proposal, estimated_cost: report.estimatedCost }).select().single();
      if (error) throw error;
      report.id = data.id;
      report.createdAt = data.created_at;
      report.status = data.status;
    }
    setReports((current) => [report, ...current]);
    setDraft({});
    return report;
  };

  return <AppDataContext.Provider value={{ reports, draft, updateDraft, submitReport }}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData debe usarse dentro de AppDataProvider');
  return context;
}
