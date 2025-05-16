import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ChartWrapper = styled.div`
  width: 100%;
  margin: 1.4rem;
  background-color: #0D1B2A;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  color: black;
  padding: 0.75rem 1rem;
  cursor: pointer;
`;

const Content = styled.div<{ isOpen: boolean }>`
  max-height: ${(props) => (props.isOpen ? "500px" : "0")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: all 0.4s ease;
  overflow: hidden;
`;

interface CollapsibleChartProps {
  title: string;
  data: any[];
  yDomain?: [number, number];
  areas: {
    dataKey: string;
    stroke: string;
    fill?: string;
    name: string;
  }[];
}

export default function CollapseChart({ title, data, yDomain, areas }: CollapsibleChartProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ChartWrapper>
      <Header onClick={() => setIsOpen((prev) => !prev)}>
        <h3>{title}</h3>
        <span>{isOpen ? "▲" : "▼"}</span>
      </Header>

      <Content isOpen={isOpen}>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <XAxis dataKey={(d) => `${d.Time}`} />
            <YAxis domain={yDomain} />
            <Tooltip labelStyle={{ color: "black" }} labelFormatter={(value, payload) => {
    const originalDatum = payload?.[0]?.payload;
    return `${originalDatum?.Date} ${originalDatum?.Time}`;
  }}/>
            <Legend />
            <CartesianGrid opacity={0.2} vertical={false} />
            {areas.map((area) => (
              <Area
                key={area.dataKey}
                type="monotone"
                dataKey={area.dataKey}
                fill={area.fill || area.stroke}
                stroke={area.stroke}
                name={area.name}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </Content>
    </ChartWrapper>
  );
}
