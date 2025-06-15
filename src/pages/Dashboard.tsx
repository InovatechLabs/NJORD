import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Nav from '../components/nav/Nav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GlobalStyles from "../components/globalstyles/GlobalStyles";
import { CustomDateInput } from "../components/dashboard/CustomDateInput";
import { StyledAside } from "../components/dashboard/StyledAside";
import umiditySvg from '../../src/images/image 14.png';
import uvSvg from '../../src/images/image 15.png';
import windSvg from '../../src/images/image 16.png';
import tempSvg from '../../src/images/Layer_1.png';
import wind_dir from '../../src/images/wind_dir.png';
import download from '../../src/images/download_icon.png';
import styled from "styled-components";
import CollapseChart from "../components/dashboard/CollapseChart";
import Papa from 'papaparse';
import { useAuth } from "../contexts/AuthContext";
import { Overlay } from "../components/dashboard/StyledAside";
import { CardCarousel } from "../components/dashboard/CardCarousel";
import { motion } from "framer-motion";
import { IconChartBar } from '@tabler/icons-react';
import { IconTable } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";
import Notification from "../components/notifications/Notification";

interface CsvData {
  Date: string;
  Time: string;
  temp: number;
  hum: number;
  uv_level: number
  wind_rt: number;
  bar: number;
  wind_peak: number;
  wind_avg: number;
  wind_dir_rt: number;
  wind_dir_avg: number;
}

export default function Dashboard() {
  const [data, setData] = useState<CsvData[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [groupByHour, setGroupByHour] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

const location = useLocation();
const navigate = useNavigate();

const formato = location.pathname.includes('/table') ? 'tabela' : 'grafico';

const handleTableClick = () => {
  navigate('/dashboard/table');
};

const handleGraphicClick = () => {
  navigate('/dashboard');
};

  const { isAuthenticated } = useAuth();

  const today = new Date();

  const handleExport = () => {
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "dados_filtrados.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  const fetchData = async () => {
    try {

      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/csv/dashboard`, {
        params: {
          start: formattedStart,
          end: formattedEnd,
          groupByHour
        }
      });
      const cleanedData = res.data.map((entry: any) => {
        const cleanedEntry: any = {};
      
        Object.keys(entry).forEach((key) => {
          const trimmedKey = key.trim();
          let value = entry[key];
          if (!isNaN(Number(value))) {
            value = Number(value);
          }
      
          cleanedEntry[trimmedKey] = value;
        });  
        const dateObj = new Date(entry.reading_time);
      
        cleanedEntry.Date = dateObj.toLocaleDateString('pt-BR'); 
        cleanedEntry.Time = dateObj.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'America/Sao_Paulo'
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

  const calcularMin = (campo: keyof CsvData): number => {
    if(data.length === 0) return 0;
    return Math.min(...data.map((d) => Number(d[campo])));
  }

  return (
    <>
  <GlobalStyles />
  <Nav />
  <Notification message=''/>
  <div className="relative">
          <div className="min-h-screen w-full bg-gray-100 flex flex-col xl:flex-row items-center justify-around px-12 py-8 gap-8 overflow-x-hidden">
        
          <motion.div
            className="max-w-2xl bg-transparent p-8 rounded-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* <TextWrapper>
              <Paragraph>
              Comece aqui
            </Paragraph>
            </TextWrapper> */}
            
        
            <motion.h1
              className="text-4xl font-bold mb-4 text-[#00405c] font-serif"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              Visualização Meteorológica Inteligente
            </motion.h1>
        
            <motion.p
              className="text-gray-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              Nossa solução oferece uma visualização eficiente e interativa dos dados meteorológicos por meio de gráficos dinâmicos ou tabelas intuitivas e de alta qualidade. 
              Obtenha acesso exclusivo a ferramentas que permitem explorar o histórico de dados de cada estação e visualizar parâmetros específicos. 
            </motion.p>

            <h2 className='mt-4'>Como você deseja visualizar os dados?</h2>
      <div className='flex flex-row mt-4 gap-2'>
              <button
                onClick={handleTableClick}
                className={`flex items-center gap-2 px-4 py-3 rounded transition-all duration-300 ${formato === 'tabela' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
              >
                <IconTable size={20} />
                Formato tabular
              </button>

              <button
                onClick={handleGraphicClick}
                className={`flex items-center gap-2 px-4 py-3 rounded transition-all duration-300 ${formato === 'grafico' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
              >
                <IconChartBar size={20} />
                Formato gráfico
              </button>
      </div>
          </motion.div>
        
        
          {/* CardCarousel do lado direito */}
          <motion.div className="w-full max-w-lg sm:max-w-xl" initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}>
            <CardCarousel />
          </motion.div>
        </div>
           <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg className="relative block w-full h-[90px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0 0L1200 0L1200 120L0 0Z" fill="#0D1B2A"></path>
          </svg>
        </div>
           </div>
  <div className="flex min-h-screen bg-[#0D1B2A]">
    {/* Menu lateral */}
    {data.length > 0 && (
  <>
    <Overlay visible={!collapsed && window.innerWidth <= 520} onClick={() => setCollapsed(true)} />

     {collapsed && (
          <div style={{ position: 'relative' }}>
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        style={{
          position: 'absolute',
          left: collapsed ? '0' : window.innerWidth <= 520 ? '80%' : '16rem',
          zIndex: 40,
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          padding: '0.5rem 0.5rem',
          borderRadius: '0 6px 6px 0',
          transition: 'left 0.4s ease',
          cursor: 'pointer',
        }}
      >
        {collapsed && (
          '➡️'
        )}
      </button>
    </div>
     )} 

    <StyledAside isCollapsed={collapsed}>

      <p style={{position: 'absolute', top: '0', right: '0', color: 'red', fontWeight: '600', fontSize: '1.5rem', marginRight: '10px', cursor: 'pointer'}} onClick={() => setCollapsed((prev) => !prev)}>X</p>   
      <h1 className="text-xl font-bold mb-4 text-white p-1 text-center">Sumário</h1>

      <div className="flex items-center gap-3 text-white py-2 hover:bg-blue-500 rounded-lg transition-all duration-200">
        <img src={tempSvg} alt="" className="w-10 h-10" />
        <div className="flex flex-col ">
          <strong>Temperatura</strong>
          <span>Máxima: <strong>{calcularMax("temp")} °C</strong></span>
          <span>Média: <strong>{calcularMedia("temp")} °C</strong></span>
          <span>Mínima: <strong>{calcularMin("temp")} °C</strong></span>
        </div>
      </div>

      

      {/* Umidade */}
      <div className="flex items-center gap-3 text-white py-2 hover:bg-blue-500 rounded-lg transition-all duration-200">
        <img src={umiditySvg} alt="" className="w-10 h-10" />
        <div className="flex flex-col">
          <strong>Umidade</strong>
          <span>Máxima: <strong>{calcularMax("hum")} %</strong> </span> 
          <span>Média: <strong>{calcularMedia("hum")} %</strong> </span>
        </div>
      </div>

      {/* Radiação */}
      <div className="flex items-center gap-3 text-white py-2 hover:bg-blue-500 rounded-lg transition-all duration-200">
        <img src={uvSvg} alt="" className="w-10 h-10" />
        <div className="flex flex-col">
          <strong>Radiação UV</strong>
          <span>Máxima: <strong>{calcularMax("uv_level")} W/m²</strong></span>
          <span>Média: <strong>{calcularMedia("uv_level")} W/m²</strong></span>
        </div>
      </div>

      {/* Vento */}
      <div className="flex items-center gap-3 text-white py-2 hover:bg-blue-500 rounded-lg transition-all duration-200">
        <img src={windSvg} alt="" className="w-10 h-10" />
        <div className="flex flex-col">
          <strong>Vento:</strong>
          <span>Máxima: <strong>{calcularMax("wind_rt")} m/s</strong></span>
          <span>Média: <strong>{calcularMedia("wind_rt")} m/s</strong></span>
        </div>
      </div>

      {/* Direção do Vento */}
      <div className="flex items-center gap-3 text-white py-2 hover:bg-blue-500 rounded-lg transition-all duration-200">
        <img src={wind_dir} alt="" className="w-10 h-10" />
        <div className="flex flex-col">
          <strong>Direção do vento:</strong>
          <span>Máxima: <strong>{calcularMax("wind_dir_rt")} (°)</strong></span>
          <span>Média: <strong>{calcularMedia("wind_dir_rt")} (°)</strong></span>
          <span>Mínima: <strong>{calcularMin("wind_dir_rt")} (°)</strong></span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-white py-2 hover:bg-blue-500 rounded-lg transition-all duration-200">
        <img src={wind_dir} alt="" className="w-10 h-10" />
        <div className="flex flex-col">
          <strong>Pico de intensidade</strong>
          <span>Máxima: <strong>{calcularMax("wind_peak")} m/s</strong></span>
          <span>Média: <strong>{calcularMedia("wind_peak")} m/s</strong></span>
          <span>Mínima: <strong>{calcularMin("wind_peak")} m/s</strong></span>
        </div>
      </div>

              <div className="relative inline-block group">
                <button
                  className="group-disabled:pointer-events-auto flex flex-row-reverse items-center justify-end gap-2 px-2 py-6 mt-2 text-white bg-transparent hover:bg-[#4d9dff] rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
                  disabled={!isAuthenticated}
                  onClick={handleExport}
                >
                  Download dados
                  <img src={download} alt="Icon" className="w-10 h-10" />
                </button>

                {!isAuthenticated && (
                  <span className="absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-2 text-sm text-white bg-black rounded-md left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                    Faça login para exportar dados
                  </span>
                )}
              </div>
     </StyledAside>

     </>
    )}
    

    {/* Conteúdo principal */}
    <div className="flex-1 p-6 flex flex-col items-center text-white">
      {!data.length && (
        <Title>Para começar, selecione o intervalo de datas para a visualização dos dados:</Title>
      )}
      

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
            maxDate={today}
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
            maxDate={today}
          />
          <GraphBtn onClick={fetchData}>Gerar gráfico</GraphBtn>
        </DatePickerWrapper>
      </div>

      {/* Gráfico de Temperatura e Umidade */}
      <CollapseChart 
      title="Gráfico de Temperatura e Umidade"
      data={data}
      
       areas={[
    { dataKey: "hum", stroke: "#4FC3F7", name: "Umidade (%)", fill: "#4FC3F7" },
    { dataKey: "temp", stroke: "#FF6B6B", name: "Temperatura (°C)", fill: "#FF6B6B" },
  ]}
  />
      

      {/* Gráfico de Radiação Solar e Vento */}
        <CollapseChart 
      title="Gráfico de direção e intensidade do vento"
      data={data}
       areas={[
    { dataKey: "wind_dir_rt", stroke: "#36ff2f", name: "Direção do vento (°)", fill: "#36ff2f" },
    { dataKey: "wind_rt", stroke: "#00bcd4", name: "Intensidade do vento (m/s)", fill: "#00bcd4" },
  ]}
  />

      {/* Gráfico de Direção Média & Instantânea do Vento */}
        <CollapseChart 
      title="Gráfico de pressão atmosférica e radiação solar"
      data={data}
       areas={[
    { dataKey: "bar", stroke: "#ff4a77", name: "Pressão atmosférica (bar)", fill: "#ff4a77" },
    { dataKey: "uv_level", stroke: "#6f16ff", name: "Radiação solar (W/m²)", fill: "#6f16ff" },
  ]}
  />

          <CollapseChart 
      title="Gráfico de direção e intensidade média do vento"
      data={data}
       areas={[
    { dataKey: "wind_dir_avg", stroke: "#2f44ff", name: "Direção média do vento (°)", fill: "#2f44ff" },
    { dataKey: "wind_avg", stroke: "#ff16ff", name: "Intensidade média do vento (m/s)", fill: "#ff16ff" },
  ]}
  />

          <CollapseChart 
      title="Gráfico do pico de intensidade do vento"
      data={data}
       areas={[
    { dataKey: "wind_peak", stroke: "#caa02b", name: "Pico de intensidade do vento (m/s)", fill: "#caa02b" },
  ]}
  />
    
    </div>
  </div>
</>
  );
}

export const Title = styled.h1`
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 20px;
        color: #fff;
        @media (max-width: 420px) {
          font-size: 26px;
        }
        @media (max-width: 370px) {
          font-size: 22px;
        }
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

   @media (max-width: 700px) {
      display: flex;
      flex-direction: column;
    }
`;

export const GraphBtn = styled.button`
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

const Tooltip = styled.div`
  position: relative;
  display: inline-block;

  .tooltip-text {
    visibility: hidden;
    width: 160px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px;
    border-radius: 4px;

    position: absolute;
    bottom: 15%;
    left: -130%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1;
  }

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }

`;

export const TextWrapper = styled.div`
display: flex;
align-items: center;
border-left: 5px solid #415A77; 
padding-left: 10px;          
height: 25px;    
margin-bottom: 20px;
`;

export const Paragraph = styled.p`
font-family: 'Inter', sans-serif;
font-weight: 100;
letter-spacing: 8px;
text-transform: uppercase;
color: white;
font-size: 16px;     
`;