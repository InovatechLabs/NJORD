import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, CardContent } from "../ui/Card";
import Button from "../ui/Button";
import { Database, Upload, Trash, Clock } from "lucide-react"; // Importando ícones do Lucide

// Layout Wrapper para cartões
const PanelWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));  /* Adaptação dinâmica */
  gap: 1.5rem;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1e293b;
  grid-column: span 2;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const CardWrapper = styled(Card)`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #3b4c63;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.5rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const DatabasePanel: React.FC = () => {
  const [collectionStats, setCollectionStats] = useState([
    { name: "users", count: 0, lastCreated: "-" },
    { name: "csvdata", count: 0, lastCreated: "-" },
  ]);

  useEffect(() => {
    const getDocumentCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin/countdata', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        setCollectionStats([
          { name: "users", count: data.userCount, lastCreated: data.lastCreated },
          { name: "csvdata", count: data.meteoCount || 0, lastCreated: data.lastCreated || "-" },
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    getDocumentCount();
  }, []);

  const handleExport = (collection: string) => {
    console.log(`Exportando ${collection} para CSV`);
    // lógica de exportação
  };

  const handleClearOld = (collection: string) => {
    console.log(`Limpando registros antigos de ${collection}`);
    // lógica de limpeza
  };

  return (
    <div className="flex">
      <main className="flex-1 p-6 bg-white-50" style={{ height: "100vh" }}>
        <PanelWrapper>
          <Title>
            <Database className="inline-block mr-2" size={24} /> Painel do Banco de Dados
          </Title>

          {collectionStats.map((col) => (
            <CardWrapper key={col.name}>
              <CardContent>
                <CardTitle>
                  {col.name}
                </CardTitle>
                <CardText>Total: {col.count} registros</CardText>
                <CardText>
                  Último registro: {col.lastCreated} <Clock size={14} />
                </CardText>
                <ButtonGroup>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleExport(col.name)}
                  >
                    <Upload className="mr-2" size={16} /> Exportar CSV
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleClearOld(col.name)}
                  >
                    <Trash className="mr-2" size={16} /> Limpar Antigos
                  </Button>
                </ButtonGroup>
              </CardContent>
            </CardWrapper>
          ))}
        </PanelWrapper>
      </main>
    </div>
  );
};

export default DatabasePanel;
