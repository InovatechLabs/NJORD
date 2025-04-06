import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import styled from 'styled-components';

interface CsvRow {
  [key: string]: string | number;
}

export default function CsvManager() {
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [filteredData, setFilteredData] = useState<CsvRow[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsedData = results.data as CsvRow[];
        setCsvData(parsedData);
        setFilteredData(parsedData);
      },
    });
  };

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    
    const newFilteredData = csvData.filter(row => {
      return Object.entries(newFilters).every(([key, val]) => {
        return val === "" || String(row[key]).includes(val);
      });
    });

    setFilteredData(newFilteredData);
  };

  const handleSubmitToServer = async () => {
    try {
      await axios.post("http://localhost:3000/api/csv/upload", csvData);
      alert("Dados enviados com sucesso!");
    } catch (error) {
      alert("Erro ao enviar dados: " + error);
    }
  };

  const handleExport = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "dados_filtrados.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: cinzaEscuro, minHeight: '100vh' }}>
     <div style={{backgroundColor: 'white', borderRadius: '30px', maxWidth: '30%', padding: '20px'}}>
  <h2>Gerenciador de CSV</h2>
  <input type="file" accept=".csv" onChange={handleFileUpload} /> 
  </div>
  {csvData.length > 0 && (
         <ButtonContainer>
         <StyledButton onClick={handleSubmitToServer} variant="success">
         <img src="https://www.svgrepo.com/show/347932/save.svg" style={{ width: '20px', height: '20px' }} />  Salvar no banco
         </StyledButton>
         <StyledButton onClick={handleExport} variant="warning">
         <img src="https://www.svgrepo.com/show/357723/export.svg" style={{ width: '20px', height: '20px' }} /> Exportar filtrado
         </StyledButton>
       </ButtonContainer>
      )}

  {/* Logica para caso os filtros aplicados não correspondam a nenhum dado */}
  {csvData.length > 0 && filteredData.length === 0 && (
      <p style={{ color: 'white', marginTop: '20px' }}>
        Nenhum resultado encontrado para os filtros aplicados.
      </p>
    )}

{csvData.length > 0 && (
  <div
    style={{
      maxHeight: '700px',
      maxWidth: '100%',
      overflow: 'auto',
      border: '1px solid #415A77',
      borderRadius: '8px',
      marginTop: '20px',
    }}
  >
    <table
      style={{
        borderCollapse: 'collapse',
        width: '100%',
        minWidth: '900px',
        tableLayout: 'fixed',
      }}
    >
      <thead>
        <tr>
          {Object.keys(csvData[0]).map((key) => (
            <th
              key={key}
              style={{
                backgroundColor: '#1B263B',
                color: '#E0E1DD',
                padding: '12px',
                fontWeight: 700,
                position: 'sticky',
                top: 0,
                zIndex: 2,
              }}
            >
              {key}
              <br />
              <input
                type="text"
                placeholder={`Filtrar ${key}`}
                value={filters[key] || ''}
                onChange={(e) => handleFilterChange(key, e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '4px',
                  padding: '4px',
                  backgroundColor: '#415A77',
                  color: 'white',
                  border: '1px solid #778DA9',
                  outline: 'none',
                  borderRadius: '4px',
                }}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.length > 0 ? (
          filteredData.map((row, i) => (
            <tr
              key={i}
              style={{
                backgroundColor: i % 2 === 0 ? '#0D1B2A' : '#1B263B',
                color: 'white',
              }}
            >
              {Object.values(row).map((val, j) => (
                <td key={j} style={{ padding: '12px', textAlign: 'center' }}>
                  {val}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={Object.keys(csvData[0]).length}
              style={{
                padding: '20px',
                textAlign: 'center',
                color: '#E0E1DD',
                backgroundColor: '#1B263B',
              }}
            >
              Nenhum resultado encontrado com os filtros atuais.
              <br />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)}
</div>
  );
}

const azulGelo = '#415A77';
const azulProfundo = '#1B263B';
const cinzaEscuro = '#0D1B2A';
const verdeCiano = '#01af5b';
const laranjaVibrante = '#FF9100';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin: 20px 0;
`;

export const StyledButton = styled.button<{ variant?: 'success' | 'warning' }>`
  background-color: ${({ variant }) =>
    variant === 'success'
      ? verdeCiano
      : variant === 'warning'
      ? laranjaVibrante
      : azulGelo};
  color: ${({ variant }) => (variant ? '#fff' : '#000')};
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 400;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;