import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from '../components/nav/Nav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from "recharts";

interface CsvData {
  Date: string;
  Time: string;
  Temp_C: number;
  "Hum_%": number;
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
      
    console.log("Datas enviadas:", formattedStart, formattedEnd);
      const res = await axios.get("http://localhost:3000/api/csv/dashboard", {
        params: {
          start: formattedStart,
          end: formattedEnd,
          groupByHour
        }
      });
      const cleanedData = res.data.map((entry: any) => {
        const cleanedEntry: any = {};
        Object.keys(entry).forEach((key) => {
          const trimmedKey = key.trim(); // remove espaços no início e fim, devido aos dados do vento estarem com um espaço no final do nome
          cleanedEntry[trimmedKey] = entry[key];
        });
        return cleanedEntry;
      });
  
      setData(cleanedData);
    } catch (err) {
      alert("Erro ao buscar dados do dashboard");
    }
  };

  function formatDateToISO(date: Date | null): string | undefined {
    if (!date) return undefined;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  
  const formattedStart = formatDateToISO(startDate);
  const formattedEnd = formatDateToISO(endDate);

  const calcularMedia = (campo: string): number => {
    if (data.length === 0) return 0;
    const soma = data.reduce((acc, d) => acc + Number(d[campo]), 0);
    return parseFloat((soma / data.length).toFixed(2));
  };
  
  const calcularMax = (campo: string): number => {
    if (data.length === 0) return 0;
    return Math.max(...data.map((d) => Number(d[campo])));
  };

  return (
    <>
    <Nav />
    <div style={{ padding: 20 }}>
      <h1>Dashboard Meteorológico - Njord</h1>
      <button onClick={fetchData}>Gerar gráfico</button>
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
        <div><strong>Umidade Média:</strong> {calcularMedia("Hum_%")} %</div>
        <div><strong>Radiação Máx:</strong> {calcularMax("SR_Wm2")} W/m²</div>
        <div><strong>Vento Máx:</strong> {calcularMax("WindSpeed_Inst")} m/s</div>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Gráfico de Temperatura e Umidade</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis dataKey={groupByHour ? "Time" : "Date"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="Temp_C" fill="#ff7300" stroke="none"/>
            <Area type="monotone" dataKey="Hum_%" fill="#387908" stroke="none"/>
          </AreaChart>
          </ResponsiveContainer>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Gráfico de Radiação Solar e Vento</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis dataKey={groupByHour ? "Time" : "Date"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="SR_Wm2" fill="#8884d8" stroke="#8884d8" name="Radiação W/m²" />
            <Area type="monotone" dataKey="WindSpeed_Inst" fill="#00bcd4" stroke="#00bcd4" name="Vento Inst. (m/s)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
}
