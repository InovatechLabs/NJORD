import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticatedRequest } from '../middlewares/verifyToken';
import mongoose from 'mongoose';

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

        const token = jwt.sign({ _id: usuarioExiste._id}, process.env.JWT_SECRET!, { expiresIn: '1h'});
        res.cookie('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // HTTPS em produção
          sameSite: 'lax',
          maxAge: 3600000, // 1 hora
        });
        console.log(res)
        return res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao tentar fazer login.' });
  }
}


export const logout = async (req: Request, res: Response) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'lax',
  });

  res.status(200).json({ message: 'Logout bem-sucedido' })
}


export const getUserInfo = async (req: AuthenticatedRequest, res: Response) => {
  console.log("req.user recebido no controlador:", req.user);
  try {

    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const userId = new mongoose.Types.ObjectId(req.user._id); 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    console.log(user);

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
};


export const updateUserInfo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user ? req.user._id : '');


    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const { nome, email, senha } = req.body;

   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const updateData: { nome?: string, email?: string, senha?: string } = {};

    if (nome) updateData.nome = nome;
    if (email) updateData.email = email;
    if (senha) {
      const hashedPassword = await bcrypt.hash(senha, 10);
      updateData.senha = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
};
