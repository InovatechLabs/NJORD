import React, { useState } from "react";
import axios from "axios";
import Nav from '../components/nav/Nav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GlobalStyles from "../components/globalstyles/GlobalStyles";
import { CustomDateInput } from "../components/dashboard/CustomDateInput";
import DashBoardPresentation from "../components/dashboard/DashboardPresentation";
import image from '../images/path.png';
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
  SR_Wm2: number
  WindSpeed_Inst: number;
  Press_Bar: number;
  WindPeak_ms: number;
  WindSpeed_Avg: number;
  WindDir_Inst: number;
  WindDir_Avg: number;
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
  <DashBoardPresentation />
  
  <div className="flex min-h-screen bg-[#1c1c30]">
    {/* Menu lateral */}
    <aside className="w-64 bg-[#262646] p-4 flex flex-col space-y-4 sticky top-0 self-start min-h-20">
      <h1 className="text-xl font-bold mb-6 text-white p-2 text-center ">Menu</h1>

      {/* Temperatura Média */}
      <div className="flex items-center gap-3 text-white px-4 py-2 hover:bg-blue-500 rounded-lg transition-all duration-200">
        <img src={tempSvg} alt="" className="w-10 h-10" />
        <div className="flex flex-col ">
          <strong>Temp. Média:</strong>
          <span>{calcularMedia("Temp_C")} °C</span>
        </div>
      </div>

      {/* Umidade Média */}
      <div className="flex items-center gap-3 text-white px-4 py-2 hover:bg-blue-500 rounded-lg transition-all duration-200">
        <img src={umiditySvg} alt="" className="w-10 h-10" />
        <div className="flex flex-col">
          <strong>Umidade Média:</strong>
          <span>{calcularMedia("Hum_%")} %</span>
        </div>
      </div>

      {/* Radiação Máxima */}
      <div className="flex items-center gap-3 text-white px-4 py-2 hover:bg-blue-500 rounded-lg transition-all duration-200">
        <img src={uvSvg} alt="" className="w-12 h-12" />
        <div className="flex flex-col">
          <strong>Radiação Máx:</strong>
          <span>{calcularMax("SR_Wm2")} W/m²</span>
        </div>
      </div>

      {/* Vento Máximo */}
      <div className="flex items-center gap-3 text-white px-4 py-2 hover:bg-blue-500 rounded-lg transition-all duration-200">
        <img src={windSvg} alt="" className="w-10 h-10" />
        <div className="flex flex-col">
          <strong>Vento Máx:</strong>
          <span>{calcularMax("WindSpeed_Inst")} m/s</span>
        </div>
      </div>
    </aside>

    {/* Conteúdo principal */}
    <div className="flex-1 p-6 flex flex-col items-center text-white">
      <Title>Para começar, selecione o intervalo de datas para a visualização dos dados:</Title>

      <div className="flex items-center justify-center gap-4 mb-6">
        <DatePickerWrapper>
          <label style={{ color: '#fff' }}>Data Início:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
            customInput={<CustomDateInput />}
          />

          <label style={{ color: '#fff' }}>Data Fim:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
            customInput={<CustomDateInput />}
          />
          <GraphBtn onClick={fetchData}>Gerar gráfico</GraphBtn>
        </DatePickerWrapper>
      </div>

      <h3>Gráfico de Temperatura e Umidade</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey={groupByHour ? "Time" : "Date"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="Hum_%" fill="#4FC3F7" stroke="#4FC3F7" />
          <Area type="monotone" dataKey="Temp_C" fill="#FF6B6B" stroke="#FF6B6B" />
          <CartesianGrid opacity={0.2} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>

      <h3>Gráfico de Radiação Solar e Vento</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey={groupByHour ? "Time" : "Date"} />
          <YAxis domain={[0, 400]} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="WindDir_Avg" fill="#36ff2f" stroke="#36ff2f" name="Direção média do Vento (°)" />
          <Area type="monotone" dataKey="WindSpeed_Inst" fill="#00bcd4" stroke="#00bcd4" name="Velocidade Inst. do Vento (m/s)" />
        </AreaChart>
      </ResponsiveContainer>

      <h3>Gráfico de Direção Média & Instantânea do Vento</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey={groupByHour ? "Time" : "Date"} />
          <YAxis domain={[0, 1100]} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="Press_Bar" fill="#ff4a77" stroke="#ff4a77" name="Pressão atmosférica" />
          <Area type="monotone" dataKey="SR_Wm2" fill="#fbff16" stroke="#fbff16" name="Radiação solar (W/m²)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
</>
  );
}

const Title = styled.h1`
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 20px;
        color: #fff;
`;

const Image = styled.img`
   position: absolute;
    width: 100%; 
    height: auto;
    z-index: 1; 
`;

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
  gap: 15px;
`;

const GraphBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 12px;
  color: #fff;
  padding: 8px 20px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;

  &:hover {
    background-color: #fff;
    color: #0D1B2A;
  }

  svg {
    font-size: 1.5rem;
  }
`;