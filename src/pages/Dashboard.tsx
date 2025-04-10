import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

interface CsvData {
  Date: string;
  Time: string;
  Temp_C: number;
  Hum_: number;
  SR_Wm2: number;
  WindSpeed_Inst: number;
}

export default function Dashboard() {
  const [data, setData] = useState<CsvData[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [groupByHour, setGroupByHour] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/csv/dashboard", {
        params: {
          start: startDate?.toISOString(),
          end: endDate?.toISOString(),
          groupByHour
        }
      });
      setData(res.data);
    } catch (err) {
      alert("Erro ao buscar dados do dashboard");
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate, groupByHour]);

  const calcularMedia = (campo: keyof CsvData): number => {
    if (data.length === 0) return 0;
    const soma = data.reduce((acc, d) => acc + Number(d[campo]), 0);
    return parseFloat((soma / data.length).toFixed(2));
  };

  const calcularMax = (campo: keyof CsvData): number => {
    if (data.length === 0) return 0;
    return Math.max(...data.map((d) => Number(d[campo])));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard Meteorológico - Njord</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div>
          <label>Data Início:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label>Data Fim:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label>Detalhamento:</label>
          <select value={groupByHour ? "hora" : "dia"} onChange={e => setGroupByHour(e.target.value === "hora")}> 
            <option value="hora">Por Hora</option>
            <option value="dia">Por Dia</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <div><strong>Temp. Média:</strong> {calcularMedia("Temp_C")} °C</div>
        <div><strong>Umidade Média:</strong> {calcularMedia("Hum_")} %</div>
        <div><strong>Radiação Máx:</strong> {calcularMax("SR_Wm2")} W/m²</div>
        <div><strong>Vento Máx:</strong> {calcularMax("WindSpeed_Inst")} m/s</div>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Gráfico de Temperatura e Umidade</h3>
          <LineChart data={data}>
            <XAxis dataKey={groupByHour ? "Time" : "Date"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Temp_C" stroke="#ff7300" name="Temp (°C)" />
            <Line type="monotone" dataKey="Hum_%" stroke="#387908" name="Umidade (%)" />
          </LineChart>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Gráfico de Radiação Solar e Vento</h3>
          <LineChart data={data}>
            <XAxis dataKey={groupByHour ? "Time" : "Date"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="SR_Wm2" stroke="#8884d8" name="Radiação W/m²" />
            <Line type="monotone" dataKey="WindSpeed_Inst" stroke="#00bcd4" name="Vento Inst. (m/s)" />
          </LineChart>
      </div>
    </div>
  );
}
