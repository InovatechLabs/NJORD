import { create } from 'zustand';

type Leitura = {
  id: number;
  temp: string;
  hum: string;
  bar: string;
  cab_temp: string;
  bat_volts: string;
  uv_level: string;
  wind_peak: string;
  wind_rt: string;
  wind_avg: string;
  wind_dir_rt: string;
  wind_dir_avg: string;
  reading_time: string;
  [key: string]: string | number;
};

interface LeituraStore {
  dados: Leitura | null;
  loading: boolean;
  erro: string | null;
  fetchLeitura: () => Promise<void>;
}

export const useLeituraStore = create<LeituraStore>((set) => ({
  dados: null,
  loading: false,
  erro: null,

  fetchLeitura: async () => {
    try {
      set({ loading: true, erro: null });

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/csv/last`);
      const json = await res.json();

      set({ dados: json, loading: false });
    } catch (err: any) {
      set({ erro: err.message || 'Erro ao buscar dados', loading: false });
    }
  }
}));