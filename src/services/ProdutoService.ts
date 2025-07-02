/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/ProdutoService.ts
import type Produto from "../components/models/Produto";
import { buscar, cadastrar, atualizar, deletar } from "./ApiBase";


// Helper para converter o preço do backend (string) para número (para uso no frontend)
const formatProdutoResponse = (produto: any): Produto => {
  return {
    ...produto,
    // Converte o preco para number, garantindo que .toFixed() funcione
    preco: typeof produto.preco === 'string' ? parseFloat(produto.preco) : produto.preco,
    // Garante que categoria.nome exista se categoria.id existir (para formulários)
    categoria: produto.categoria ? {
      id: produto.categoria.id,
      nome: produto.categoria.nome || ''
    } : undefined
  };
};


// --- Funções Específicas para Produto ---
export const getAllProdutos = async (): Promise<Produto[]> => {
  const response = await buscar<Produto[]>('/produtos');
  // Mapeia e formata cada produto na resposta
  return response.map(formatProdutoResponse);
};

export const getProdutoById = async (id: number): Promise<Produto> => {
  const response = await buscar<Produto>(`/produtos/${id}`);
  // Formata o produto único na resposta
  return formatProdutoResponse(response);
};

export const getProdutosByNome = async (nome: string): Promise<Produto[]> => {
  const response = await buscar<Produto[]>(`/produtos/nome/${nome}`);
  return response.map(formatProdutoResponse);
};

export const postProduto = async (produto: Produto): Promise<Produto> => {
  const payload = {
    id: 0,
    nome: produto.nome,
    preco: produto.preco, // O preço já deve ser number aqui, vindo do formulário
    foto: produto.foto,
    categoria: produto.categoria ? {
        id: produto.categoria.id || 0,
        nome: produto.categoria.nome || ""
    } : undefined
  };
  const response = await cadastrar<Produto>('/produtos', payload);
  return formatProdutoResponse(response); // Formata a resposta do POST também
};

export const putProduto = async (produto: Produto): Promise<Produto> => {
  const payload = {
    id: produto.id,
    nome: produto.nome,
    preco: produto.preco, 
    foto: produto.foto,
    categoria: produto.categoria ? {
        id: produto.categoria.id || 0,
        nome: produto.categoria.nome || ""
    } : undefined
  };
  const response = await atualizar<Produto>('/produtos', payload);
  return formatProdutoResponse(response); 
};

export const deleteProduto = async (id: number): Promise<void> => {
  await deletar(`/produtos/${id}`);
};