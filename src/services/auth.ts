import axios from "axios";

const apiUrl = "http://localhost:3000/api/";

interface User {
  nome: string;
  email: string;
  senha: string;
}

interface ApiResponse {
  message: string;
  token?: string;
  requires2FA?: boolean;
  tempToken?: string;
  user: {
    _id: string;   
    nome: string;
  };
}

interface UserLogin {
  email: string;
  senha: string;
}

interface RecoverValue {
  email: string;
}

interface RecoverResponse {
  message: string;
  token: string;
}


export const registerUser = async (user: User): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
    `${apiUrl}user/register`, 
    user,
    { withCredentials: true }
    );
    return response.data;
  } catch (error) {   
    throw new Error(`Failed to register user: ${error}`);
  }
};


export const loginUser = async (user: UserLogin): Promise<ApiResponse> => {
    try {
      const response = await axios.post<ApiResponse>(
        `${apiUrl}user/login`, 
        user, 
        { withCredentials: true } 
      );
      return response.data;
    } catch (error: any) {
      throw new Error("Failed to login user");
    }
  };

export const RecoverPassword = async (user: RecoverValue): Promise<RecoverResponse> => {
  try {
    const response = await axios.post<RecoverResponse>(
      `${apiUrl}recover`,
      user,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      // Captura a mensagem que veio do backend
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro inesperado ao enviar solicitação de recuperação de senha.");
  }
}