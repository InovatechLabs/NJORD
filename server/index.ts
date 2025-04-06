import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';

// Rotas
import userRouter from './routes/userRoutes';
import recoverRouter from './routes/recoverPasswordRouter';
import csvRouter from './routes/csvRoutes';

// Modelos
import User from './models/user';

dotenv.config();

const app = express();

// ===================== MIDDLEWARES =====================
app.use(cors({
  origin: 'http://localhost:3030', // Frontend
  credentials: true
}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

// ===================== ROTAS =====================
app.use("/api/user", userRouter);         // Autenticação
app.use("/api/recover", recoverRouter);   // Recuperação de senha
app.use("/api/csv", csvRouter);           // Upload de CSV

// Rota de teste - listar usuários
app.get('/listar', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(chalk.red("Erro ao listar usuários:", error));
    res.status(500).json({ message: "Erro ao listar usuários", error });
  }
});

// Rota para não encontradas
app.use((req: Request, res: Response): Response => {
  return res.status(404).json({
    message: "Rota não encontrada",
  });
});

// ===================== CONEXÃO COM BANCO =====================
const PORT = 3000;
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error('A variável de ambiente MONGODB_URL não está definida.');
}

mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log(chalk.green('✅ MongoDB conectado com sucesso'));

    // Só inicia o servidor se o Mongo estiver conectado
    app.listen(PORT, () => {
      console.log(chalk.blue(`🚀 Servidor rodando na porta ${PORT}`));
    });
  })
  .catch((err) => {
    console.error(chalk.red('❌ Erro ao conectar com o MongoDB:', err));
  });
