import React, { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Tabs, { TabsList, TabsTrigger } from "../components/ui/Tabs";
import { User, Database } from 'lucide-react';
import SettingsIcon from "../components/ui/SettingsIcon";
import styled, { keyframes } from "styled-components";
import { RefreshCcw } from "lucide-react";
import DatabasePanel from "../components/adminDashboard/DatabasePanel";


interface UserInfo {
    _id: string;
    nome: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}


export default function AdminDashboard() {
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [error, setError] = useState<string>("");
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
    const [nome, setNome] = useState(selectedUser?.nome || "");
    const [email, setEmail] = useState(selectedUser?.email || "");
    const [role, setRole] = useState("user");
    const [selectedItem, setSelectedItem] = useState('Usuários');


    const toggleModal = () => {
      setModal((prev) => !prev);
    };

function formatDate(dataISO: string): string {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  const sidebarItems = [
    { name: 'Usuários', icon: User },
    { name: 'Banco de dados', icon: Database },
  ];
  

  const getRegisteredUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/listar');
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro no fetch:", error);
    }
  };

  useEffect(() => {
    getRegisteredUsers(); 
  }, []);

  const filteredUsers = search.length > 0 ?
  users.filter(user => user.nome.toLowerCase().includes(search.toLowerCase())) :
  [];

  const deleteUser = async (id: any) => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/deleteuser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Erro ao deletar usuário');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const updateUser = async (id: any, nome?: any, email?:any, role?: any ) => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/updateuser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          id,
          nome,
          email,
          role
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Erro ao atualizar usuário');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
       <aside className="w-64 bg-blue-600 p-4 flex flex-col space-y-2">
       <h1 className="text-xl font-bold mb-6 text-white p-2 items-center">Dashboard</h1>
        {sidebarItems.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setSelectedItem(name)}
            className={`flex items-center gap-3 px-4 py-2 rounded-l-full transition-all duration-200 ease-in-out ${
              selectedItem === name
                ? 'bg-white text-blue-600 font-semibold  -mr-4 rounded-tl-md rounded-bl-md z-20'
                : 'text-white hover:bg-blue-500 -mr-4 rounded-tl-md rounded-bl-md z-10 hover:scale-101'
            }`}
          >
            <Icon size={20} />
            <span>{name}</span>
          </button>
        ))}
        
      </aside>
      {selectedItem == "Usuários" ? (
        <main className="flex-1 p-6 bg-white-50">
        <h2 className="text-2xl font-semibold mb-2">Lista de usuários cadastrados no sistema</h2>
        <p className="text-gray-500 mb-4">{users.length} usuários registrados</p>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todos usuários</TabsTrigger>
            <TabsTrigger value="dispatch">Cadastrar administrador</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <div className="p-0 overflow-x-auto">
            <input 
            name="searchUser"
            type="text"
            placeholder="Buscar usuário..."
            onChange={e => setSearch(e.target.value)}
            value={search}
            style={{marginBottom: '10px', border: 'none', outline: 'none', backgroundColor: '#eeeeee', padding: '5px 10px', borderRadius: '5px'}}
            />
            <button className="p-2 rounded hover:bg-gray-200" onClick={getRegisteredUsers}>
  <RefreshCcw className="w-5 h-5 text-gray-500" />
</button>
            <Table>
              <thead>
                <tr className="bg-gray-100">
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Data de cadastro</th>
                  <th>Tipo de usuário</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
  {(search.length <= 0 ? users : filteredUsers).map((user, idx) => (
    <tr key={user._id} className={`${idx === 1 ? 'bg-blue-600 text-white' : ''}`}>
      <td>{user._id}</td>
      <td className="flex items-center gap-2">{user.nome}</td>
      <td>{user.email}</td>
      <td>{formatDate(user.createdAt)}</td>
      <td>{user.role}</td>
      <td>
        <Button variant="ghost" size="icon" onClick={() => {
          setSelectedUser(user);
          toggleModal();
        }} className={`${idx === 1 ? 'text-white' : 'text-gray-600'}`}>
          <SettingsIcon className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  ))}
</tbody>
            </Table>
          </div>
        </Card>

        {modal && (
          <ModalOverlay onClick={toggleModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseModalButton onClick={toggleModal}>×</CloseModalButton>
              <h1 className="text-xl font-semibold mb-4">Editar informações do usuário</h1>

              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">ID</label>
                <input
                  className="border border-gray-300 p-2 rounded-md"
                  defaultValue={selectedUser?._id}
                  disabled={true}
                />

                <label className="text-sm font-medium">Nome</label>
                <input
                  className="border border-gray-300 p-2 rounded-md"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)} 
                  placeholder="Opcional"
                />

                <label className="text-sm font-medium">Email</label>
                <input
                  className="border border-gray-300 p-2 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Opcional"
                />

                <label htmlFor="user-role">Tipo de usuário</label>
                <select
                  id="user-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="user">Usuário</option>
                </select>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => updateUser(selectedUser?._id, nome, email, role)}
                >
                  Editar usuário
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  onClick={() => deleteUser(selectedUser?._id)}
                >
                  Deletar usuário
                </button>
              </div>

            </ModalContent>
          </ModalOverlay>
        )}

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>Showing 05 - 12 of 28</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((page) => (
              <Button key={page} variant="ghost" size="sm">{page}</Button>
            ))}
          </div>
        </div>
      </main>
      ) : (
        <div className="flex">
           <main className="flex-1 p-6 bg-white-50">
        <DatabasePanel />
        </main>
        </div>
      )}    
    </div>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  to {
    opacity: 1;
    transform: scale(1.0);
  }
`;

const ModalContent = styled.div`
  background-color: #ececec;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  max-height: 80vh;
  color: black;
  position: relative;
  animation: ${slideIn} 0.45s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: black;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
`;