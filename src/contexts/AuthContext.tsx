import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica o token no cookie ao montar o componente
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/verify", {
          method: "GET",
          credentials: "include",
        });
  
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setIsAuthenticated(false);
      }
    };
  
    checkAuth();
  }, []);

  // Altera o estado de autenticação e manipula o cookie
  const setAuthenticated = (authStatus: boolean) => {
    setIsAuthenticated(authStatus);
    if (!authStatus) {
    document.cookie = 'auth_token=; path=/; max-age=0'; // Remove o cookie
    }
  };

  // Função para logout: remove o cookie e redefine o estado
  const logout = async () => {
    try {
      await fetch("http://localhost:3000/api/user/logout", { 
        method: "POST",
        credentials: "include" 
      });
  
      setIsAuthenticated(false); // Atualiza o estado no frontend
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
