import React, { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Tabs, { TabsList, TabsTrigger } from "../components/ui/Tabs";
import CalendarIcon from "../components/ui/CalendarIcon";
import ChevronRightIcon from "../components/ui/ChevronRightIcon";
import SettingsIcon from "../components/ui/SettingsIcon";


interface UserInfo {
    _id: string;
    nome: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

const statusColors = {
  Pending: "text-red-500",
  Dispatch: "text-blue-500",
  Completed: "text-green-500",
};


export default function OrderPage() {
    const [users, setUsers] = useState<UserInfo[]>([]);
const [error, setError] = useState<string>("");

function formatDate(dataISO: string): string {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
  

useEffect(() => {
    const getRegisteredUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/listar');
        if (!response.ok) {
          throw new Error("Erro ao buscar usuários");
        }
        const data = await response.json();
        setUsers(data);
        console.log("Usuários cadastrados:", data);
      } catch (error) {
        console.error("Erro no fetch:", error);
      }
    };
  
    getRegisteredUsers();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-60 min-h-screen [background-color:#0D1B2A] text-white p-4 flex flex-col gap-4">
        <h1 className="text-xl font-bold mb-6">NJORD</h1>
        {['Dashboard', 'Usuários', 'Banco de dados', 'Product', 'Stock', 'Offer'].map((item) => (
          <button
            key={item}
            className={`text-left px-3 py-2 rounded hover:bg-blue-700 ${item === 'Order' ? 'bg-white text-blue-600 font-semibold' : ''}`}
          >
            {item}
          </button>
        ))}
        <div className="mt-auto text-sm text-white/70">
          <div className="flex gap-2">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Google</a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-2">Order</h2>
        <p className="text-gray-500 mb-4">28 orders found</p>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todos usuários</TabsTrigger>
            <TabsTrigger value="dispatch">Cadastrar usuário</TabsTrigger>
            <TabsTrigger value="pending">Deletar usuário</TabsTrigger>
            <TabsTrigger value="completed">Atualizar usuário</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2 items-center mb-4">
          <div className="flex items-center gap-1 text-gray-600">
            <CalendarIcon className="w-4 h-4" />
            <span>31 Jul 2020</span>
          </div>
          <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          <div className="flex items-center gap-1 text-gray-600">
            <CalendarIcon className="w-4 h-4" />
            <span>03 Aug 2020</span>
          </div>
        </div>

        <Card>
          <div className="p-0 overflow-x-auto">
            <Table>
              <thead>
                <tr className="bg-gray-100">
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Data de cadastro</th>
                  <th>Data de atualização</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                              {users.map((user, idx) => (
                                  <tr key={user._id} className={`${idx === 1 ? 'bg-blue-600 text-white' : ''}`}>
                                      <td>{user._id}</td>
                                      <td className="flex items-center gap-2">
                                          {user.nome}
                                      </td>
                                      <td>{user.email}</td>
                                      <td>{formatDate(user.createdAt)}</td>
                                      <td>{formatDate(user.updatedAt)}</td>
                                      <td>
                                          <Button variant="ghost" size="icon" className={`${idx === 1 ? 'text-white' : 'text-gray-600'}`}>
                                              <SettingsIcon className="w-4 h-4" />
                                          </Button>
                                      </td>
                                  </tr>
                              ))}
              </tbody>
            </Table>
          </div>
        </Card>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>Showing 05 - 12 of 28</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((page) => (
              <Button key={page} variant="ghost" size="sm">{page}</Button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}