import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
    nome: string;
    email: string;
    senha: string;
    compararSenhas(senha: string): boolean;
  }

  const UserSchema: Schema = new Schema(
    {
      nome: { 
        type: String, 
        required: true 
      },
      email: { 
        type: String, 
        required: true, 
        unique: true,  
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Por favor, insira um email válido'],  // Validação do email
      },
      senha: { 
        type: String, 
        required: true 
      },
    },
    { timestamps: true }
  );
  
  UserSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next(); 
  
    try {
      const salt = await bcrypt.genSalt(10);  
      const hash = await bcrypt.hash(this.senha as string, salt); 
      this.senha = hash;  
      next();
    } catch (err) {
      next(err as Error);
    }
  });
  
  // Metodo para comparar a senha informada com a criptografada
  UserSchema.methods.compararSenhas = async function (senha: string) {
    return await bcrypt.compare(senha, this.senha);
  };

  const User = mongoose.model<IUser>('users', UserSchema);
export default User;