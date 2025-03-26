import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();



export const register = async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;

    try {
        // Verificando se todos os parâmetros necessarios para registro foram passados pelo body
        if(!nome || !email || !senha) {
            return res.status(404).json({ 
            message: 'Todos credenciais são obrigatórios.'})
        }
        // Verificando se o mail inserido pelo usuario já está cadastrado
        const usuarioExistente = await User.findOne({ email });
        if(usuarioExistente) {
            return res.status(400).json({ message: 'Email já registrado' });
        }

        const novoUsuario = new User({
            nome,
            email,
            senha, 
          });
          // Insere o usuario recem criado ao banco
        await novoUsuario.save();
        return res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao criar usuário', err });
  }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    
    const { email, senha } = req.body;

    try {
        if(!email || !senha) {
            return res.status(404).json({ message: 'Credenciais email e senha são necessárias' });
        }

        const usuarioExiste = await User.findOne({ email });
        if(!usuarioExiste) {
            return res.status(400).json({ message: 'Não foi possível encontrar este usuário.' });
        }

        const senhaValida = await usuarioExiste.compararSenhas(senha);
        if(!senhaValida) {
            return res.status(400).json({ message: 'Senha incorreta.' })
        }

        const token = jwt.sign({ userId: usuarioExiste._id}, process.env.JWT_SECRET!, { expiresIn: '1h'});
        return res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao tentar fazer login.' });
  }
}
