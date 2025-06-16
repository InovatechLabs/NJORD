import React, { useState } from "react";
import axios from "axios";
import Nav from '../components/nav/Nav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GlobalStyles from "../components/globalstyles/GlobalStyles";
import { CustomDateInput } from "../components/dashboard/CustomDateInput";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import Comparison from '../components/comparisonPage/Comparison';
import Notification from "../components/notifications/Notification";

const DatePickerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;

  label {
    color: white;
    font-weight: 600;
  }
`;

const FetchButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 1.8rem;
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
  max-width: 900px;
`;

const Card = styled.div`
  background-color: #1b263b;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  flex: 1 1 280px;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
`;

const CardTitle = styled.h3`
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 1.3rem;
  border-bottom: 2px solid #3b82f6;
  padding-bottom: 0.3rem;
`;

const KeyValue = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0;
  border-bottom: 1px solid #2a3a56;

  span:first-child {
    font-weight: 600;
  }
`;

function ConvertAndFix(n: string) {

    let number = parseFloat(n);
    let result = number.toFixed(2);
    return result;
}

const camposPermitidos = ['temp', 'hum', 'bar', 'reading_time', 'wind_rt', 'wind_peak', 'uv_level', 'wind_avg', 'wind_dir_avg', 'wind_dir_rt'];
const nomesAmigaveis = {
    'temp': 'Temperatura',
    'hum': 'Umidade',
    'bar': 'Pressão atmosférica',
    'wind_rt': 'Intensidade do vento',
    'wind_avg': 'Intensidade média do vento',
    'wind_dir_rt': 'Direção do vento',
    'wind_dir_avg': 'Direção média do vento',
    'uv_level': 'Irradiação solar',
    'wind_peak': 'Pico de intensidade do vento'
}

function renderKeyValuePairs(obj: any) {
  if (!obj) return null;

  return Object.entries(obj)
    .filter(([key]) => camposPermitidos.includes(key))
    .map(([key, value]) => {
      let displayValue;
      let label = nomesAmigaveis[key] || key;

      if (key === 'reading_time') {
        label = 'Data';
        try {
          const date = new Date(value as string);
          displayValue = date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        } catch {
          displayValue = value;
        }
      } else {
        displayValue = ConvertAndFix(value as string);
      }

      return (
        <KeyValue key={key}>
          <span>{label}</span>
          <span>{displayValue}</span>
        </KeyValue>
      );
    });
}

export default function ComparisonPage() {
  const [data, setData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { isAuthenticated } = useAuth();
  const today = new Date();

  function formatDateToISO(date: Date | null): string | undefined {
    if (!date) return undefined;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  const formattedStart = formatDateToISO(startDate);
  const formattedEnd = formatDateToISO(endDate);

  const fetchData = async () => {
    if (!formattedStart || !formattedEnd) {
      alert("Por favor, selecione as datas de início e fim.");
      return;
    }

    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/compare`, {
        params: {
          start: formattedStart,
          end: formattedEnd,
        },
      });

      setData(res.data);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      alert("Erro ao buscar dados para comparação.");
    }
  };

  return (
    <>
      <GlobalStyles />
      <Nav />
      <Notification message='' />
      <Comparison />

<div className="min-h-screen flex flex-col items-center bg-[#0D1B2A] p-8 gap-6">
        <DatePickerWrapper>
          <label>Data Início:</label>
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

          <label>Data Fim:</label>
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

          <FetchButton onClick={fetchData}>Buscar Dados</FetchButton>
        </DatePickerWrapper>

        {data.length > 0 ? (
          data.map((item, index) => (
            <CardsWrapper key={index}>
              <Card>
                <CardTitle>estfrn01</CardTitle>
                {renderKeyValuePairs(item.estfrn01)}
              </Card>
              <Card>
                <CardTitle>estfrn02</CardTitle>
                {renderKeyValuePairs(item.estfrn02)}
              </Card>
              <Card>
                <CardTitle>diferenca</CardTitle>
                {renderKeyValuePairs(item.diferenca)}
              </Card>
            </CardsWrapper>
          ))
        ) : (
          <Title>
            Selecione um intervalo de datas e clique em "Buscar Dados" para carregar as informações.
          </Title>
        )}
      </div>
    </>
  );
}