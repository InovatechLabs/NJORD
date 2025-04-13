import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from '../components/nav/Nav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GlobalStyles from "../components/globalstyles/GlobalStyles";
import { CustomDateInput } from "../components/dashboard/CustomDateInput";
import umiditySvg from '../../src/images/image 14.png';
import uvSvg from '../../src/images/image 15.png';
import windSvg from '../../src/images/image 16.png';
import tempSvg from '../../src/images/Layer_1.png';
import {
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid
} from "recharts";
import styled from "styled-components";

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
    <>
    <GlobalStyles />
    <Nav />
    <div style={{ padding: 20 }}>
      <h1>Dashboard Meteorológico - Njord</h1>
      <button onClick={fetchData}>Gerar gráfico</button>
      <div style={{ display: "flex", gap: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>   
        <DatePickerWrapper>
          <label style={{ color: '#fff'}}>Data Início:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
            customInput={<CustomDateInput />}
          />
       
          <label style={{ color: '#fff'}}>Data Fim:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
            customInput={<CustomDateInput />}
          />
     </DatePickerWrapper>
        <div>
          <label>Detalhamento:</label>
          <select value={groupByHour ? "hora" : "dia"} onChange={e => setGroupByHour(e.target.value === "hora")}> 
            <option value="hora">Por Hora</option>
            <option value="dia">Por Dia</option>
          </select>
        </div>
      </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
          }}
        >
          {/* Temperatura Média */}
          <div style={{ color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
            <img src={tempSvg} style={{ width: 40, height: 40 }} />
            <strong>Temp. Média:</strong>
            <span>{calcularMedia("Temp_C")} °C</span>
          </div>

          {/* Umidade Média */}
          <div style={{ color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
            <img src={umiditySvg} style={{ width: 40, height: 40 }} />
            <strong>Umidade Média:</strong>
            <span>{calcularMedia("Hum_%")} %</span>
          </div>

          {/* Radiação Máxima */}
          <div style={{ color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
            <img src={uvSvg} style={{ width: 50, height: 50 }} />
            <strong>Radiação Máx:</strong>
            <span>{calcularMax("SR_Wm2")} W/m²</span>
          </div>

          {/* Vento Máximo */}
          <div style={{ color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
            <img src={windSvg} style={{ width: 40, height: 40 }} />
            <strong>Vento Máx:</strong>
            <span>{calcularMax("WindSpeed_Inst")} m/s</span>
          </div>
        </div>

      <div style={{ marginTop: 30 }}>
        <h3>Gráfico de Temperatura e Umidade</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis dataKey={groupByHour ? "Time" : "Date"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="Hum_%" fill="#4FC3F7" stroke="#4FC3F7"/>
            <Area type="monotone" dataKey="Temp_C" fill="#FF6B6B" stroke="#FF6B6B"/>
  
            <CartesianGrid opacity={0.2} vertical={false} />
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

export const DatePickerWrapper = styled.div`
  .custom-datepicker {
    background-color: rgba(57, 63, 84, 0.8);
    color: #BFD2FF;
    font-size: 1.8rem;
    line-height: 2.4rem;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 4px;
    width: 100%;
    flex-grow: 1;
    vertical-align: middle;

    &::placeholder {
      color: #7881A1;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(191, 210, 255, 0.3);
    }
  }
  .react-datepicker__day {
  color: #BFD2FF; /* cor dos números dos dias */
}

.react-datepicker__day-name {
  color: #BFD2FF;
  font-weight: bold;
}

  .react-datepicker {
    background-color: #2c3642;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    color: #BFD2FF;
  }

  .react-datepicker__day--selected {
    background-color: #4FC3F7;
    color: #000;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #3B4C6B;
  }

  .react-datepicker__current-month,
  .react-datepicker__header {
    background-color: #2c3642;
    border-bottom: 1px solid #444;
    color: #BFD2FF;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;