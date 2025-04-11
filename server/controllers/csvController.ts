import { Request, Response } from 'express';
import CsvData from '../models/csvData';

export const uploadCsvData = async (req: Request, res: Response) => {
  try {
    let data = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ message: "Dados enviados não são um array." });
    }

    // Converte o campo Date para formato ISO string
    data = data.map((item: any) => {
      const dateStr = item.Date;
      if (typeof dateStr === "string" && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
        const [month, day, year] = dateStr.split("/").map(Number);
        const iso = new Date(year, month - 1, day).toISOString().split("T")[0]; // YYYY-MM-DD
        return { ...item, Date: iso };
      }
      return item;
    });

    await CsvData.insertMany(data);
    return res.status(200).json({ message: "Dados salvos com sucesso." });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao salvar dados", error });
  }
};

export const getCsvForDashboard = async (req: Request, res: Response) => {
  const { start, end, groupByHour } = req.query;

  if (!start || !end) {
    return res.status(400).json({ message: "Datas de início e fim são obrigatórias" });
  }

  const startDate = new Date(start as string);
  const endDate = new Date(end as string);

  try {
    const data = await CsvData.find({
      Date: { $gte: start, $lte: end }
    }).lean();

    // Se for por dia, agrupar e calcular médias
    if (groupByHour === "false") {
      const agrupado: Record<string, any[]> = {};

      data.forEach((item: any) => {
        if (!agrupado[item.Date]) agrupado[item.Date] = [];
        agrupado[item.Date].push(item);
      });

      const agregados = Object.entries(agrupado).map(([data, registros]: any) => {
        const soma = (campo: string) =>
          registros.reduce((acc: number, curr: any) => acc + parseFloat(curr[campo] || 0), 0);
        const media = (campo: string) => soma(campo) / registros.length;

        return {
          Date: data,
          Temp_C: media("Temp_C"),
          Hum_: media("Hum_%"),
          SR_Wm2: Math.max(...registros.map((r: any) => parseFloat(r["SR_Wm2"] || 0))),
          WindSpeed_Inst: Math.max(...registros.map((r: any) => parseFloat(r["WindSpeed_Inst"] || 0)))
        };
      });

      return res.json(agregados);
    }

    // Se for por hora, retornar os dados originais
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar dados", err });
  }
};

