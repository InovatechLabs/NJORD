import axios from "axios";

const apiUrl = "http://localhost:3000/api/";

interface User {
  nome: string;
  email: string;
  senha: string;
}

interface ApiResponse {
  message: string;
  token: string;
  user: {
    _id: string;   
    nome: string;
  };
}

interface UserLogin {
  email: string;
  senha: string;
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

    throw new Error("Failed to register user");
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
    } catch (error) {
      throw new Error("Failed to login user");
    }
  };