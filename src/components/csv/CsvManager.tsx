import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";

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
    <div style={{ padding: "20px" }}>
      <h2>Gerenciador de CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <button onClick={handleSubmitToServer}>Salvar no banco</button>
      <button onClick={handleExport}>Exportar filtrado</button>

      {filteredData.length > 0 && (
        <table border={1} style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              {Object.keys(filteredData[0]).map((key) => (
                <th key={key}>
                  {key}
                  <br />
                  <input
                    type="text"
                    placeholder={`Filtrar ${key}`}
                    value={filters[key] || ""}
                    onChange={(e) => handleFilterChange(key, e.target.value)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
