import mongoose, {Collection} from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import userRouter from './routes';
import User from './models/user';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());


const PORT = 3000;
const MONGODB_URL = process.env.MONGODB_URL;

    // Verifica se a variável da url de conexão com o mongo está disponível, em caso negativo o código apresenta erro
    if(!MONGODB_URL) {
    throw new Error('A variável de ambiente MONGODB_URL não está definida.')
    }

    // Faz a conexão com o banco de dados da Njord
    mongoose.connect(MONGODB_URL).then(() => 
    console.log(chalk.green('MongoDB conectado com sucesso'))
).catch((err) => console.log(chalk.red('Erro ao tentar se conectar com o MongoDB:', err)));



    // Rotas para autenticação do usuario
    app.use("/api/user", userRouter);
    app.use("/api/user", userRouter);

    // Rota apenas para testes listando todos os usuarios do banco
    app.get('/listar', async (req:Request, res:Response) => {
      try {
          const Users = await User.find();
          res.json(Users);
      } catch (error) {
          res.status(500).json({message: "Erro ao listar usuarios:", error });
      }
  });

    // Rota para caso seja acessada uma rota inexistente
    app.use((req: Request, res: Response): Response => {
    return res.status(404).json({
      message: "Rota não encontrada",
    });
  });

    app.listen(PORT, () => {
        console.log(chalk.green(`Servidor rodando na porta ${PORT}`))
    });
