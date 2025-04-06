import { Request, Response } from 'express';
import CsvData from '../models/csvData';

export const uploadCsvData = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ message: "Dados enviados não são um array." });
    }

    await CsvData.insertMany(data); // grava tudo de uma vez
    return res.status(200).json({ message: "Dados salvos com sucesso." });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao salvar dados", error });
  }
};
