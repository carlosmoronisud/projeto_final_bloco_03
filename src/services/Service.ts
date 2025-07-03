/* eslint-disable @typescript-eslint/no-explicit-any */
import type Produto from "../components/models/Produto";
import { atualizar, buscar, cadastrar, deletar } from "./ApiBase";

// URL do seu backend da Farmácia no Render.
const API_BASE_URL = "https://farmacia-jk1x.onrender.com"; // <<<<< SEM BARRA FINAL AQUI!

console.log("API_BASE_URL configurada em Service.ts:", API_BASE_URL);


// --- Funções Específicas para PRODUTO ---
export const getAllProdutos = async (): Promise<Produto[]> => {
  return await buscar<Produto[]>('/produtos'); // GET /produtos
};

export const getProdutoById = async (id: number): Promise<Produto> => {
  return await buscar<Produto>(`/produtos/${id}`); // GET /produtos/{id}
};

export const getProdutosByNome = async (nome: string): Promise<Produto[]> => {
  return await buscar<Produto[]>(`/produtos/nome/${nome}`); // GET /produtos/nome/{nome}
};

export const postProduto = async (produto: Produto): Promise<Produto> => {
  // O payload deve corresponder EXATAMENTE ao que o Swagger do professor espera para POST
  const payload = {
    id: 0, // Conforme o Swagger para POST de Produto
    nome: produto.nome,
    preco: produto.preco,
    foto: produto.foto,
    categoria: { // Objeto categoria com ID e nome (mesmo que o nome não seja usado, o Swagger pede)
        id: produto.categoria?.id || 0, // Garante que o ID da categoria existe
        nome: produto.categoria?.nome || "" // Garante que o nome da categoria exista
    }
  };
  return await cadastrar<Produto>('/produtos', payload);
};

export const putProduto = async (produto: Produto): Promise<Produto> => {
  // O payload deve corresponder EXATAMENTE ao que o Swagger do professor espera para PUT
  const payload = {
    id: produto.id, // Para PUT, o ID do produto é obrigatório
    nome: produto.nome,
    preco: produto.preco,
    foto: produto.foto,
    categoria: { // Objeto categoria com ID e nome (mesmo que o nome não seja usado, o Swagger pede)
        id: produto.categoria?.id || 0, // Garante que o ID da categoria existe
        nome: produto.categoria?.nome || "" // Garante que o nome da categoria exista
    }
  };
  return await atualizar<Produto>('/produtos', payload);
};

export const deleteProduto = async (id: number): Promise<void> => { /* ... */ await deletar(`/produtos/${id}`); };

