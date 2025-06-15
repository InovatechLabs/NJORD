import React, { useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import axios from 'axios';
import { CustomDateInput } from '../components/dashboard/CustomDateInput';
import { DatePickerWrapper, GraphBtn, Title } from './Dashboard';
import DatePicker from 'react-datepicker';
import localeText from '../utils/translation/AgGrid';
import GlobalStyles from '../components/globalstyles/GlobalStyles';
import Nav from '../components/nav/Nav';
import { motion } from 'framer-motion';
import { CardCarousel } from '../components/dashboard/CardCarousel';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconChartBar } from '@tabler/icons-react';
import { IconTable } from '@tabler/icons-react';
import Notification from '../components/notifications/Notification';

ModuleRegistry.registerModules([ AllCommunityModule ]);

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

const TableView: React.FC = () => {
    
      const navigate = useNavigate();

      const [data, setData] = useState<CsvData[]>([]);
      const [startDate, setStartDate] = useState<Date | null>(null);
      const [endDate, setEndDate] = useState<Date | null>(null);
      const [groupByHour, setGroupByHour] = useState(true);
      
const location = useLocation();

const formato = location.pathname.includes('/table') ? 'tabela' : 'grafico';

const handleTableClick = () => {
  navigate('/dashboard/table');
};

const handleGraphicClick = () => {
  navigate('/dashboard');
};

      const today = new Date();
  
    const [columnDefs] = useState<ColDef[]>([
        { field: 'Date', headerName: 'Data', filter: true, sortable: true },
        { field: 'Time', headerName: 'Hora', filter: true, sortable: true },
        { field: 'temp', headerName: 'Temperatura (°C)', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'hum', headerName: 'Umidade (%)', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'uv_level', headerName: 'Índice UV', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'wind_rt', headerName: 'Veloc. Vento (Atual) (m/s)', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'bar', headerName: 'Pressão Barométrica (hPa)', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'wind_peak', headerName: 'Vento Pico (m/s)', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'wind_avg', headerName: 'Vento Médio (m/s)', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'wind_dir_rt', headerName: 'Direção Vento (Atual)', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'wind_dir_avg', headerName: 'Direção Vento (Média)', filter: 'agNumberColumnFilter', sortable: true },
      ]);

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
            try {
        
              console.log("Datas enviadas:", formattedStart, formattedEnd);
              const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/csv/dashboard`, {
                params: {
                    start: formattedStart,
                    end: formattedEnd,
                    groupByHour
                }
              })
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
              console.log(cleanedData);
            } catch (err) {
              alert("Erro ao buscar dados do dashboard");
            }
          };
   
  
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
           <div className="flex-1 p-6 flex flex-col items-center text-white bg-[#0D1B2A]">
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
                  <GraphBtn onClick={fetchData}>Gerar tabela</GraphBtn>
                </DatePickerWrapper>
              </div>
              </div>
      <div className="ag-theme-alpine" style={{ height: 700, width: '100%', padding: '10px' }}>
        <AgGridReact rowData={data} columnDefs={columnDefs} localeText={localeText}/>
      </div>
      </>
    );
  };
  
  export default TableView;