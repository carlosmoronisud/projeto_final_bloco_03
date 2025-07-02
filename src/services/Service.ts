/* eslint-disable @typescript-eslint/no-wrapper-object-types */
// src/services/Service.ts
    import axios from "axios";
    import { toast } from 'react-toastify';
import type Categoria from "../components/models/Categoria";
   
    // import Produto from "../models/Produto"; // Importar o modelo Produto quando precisar

    // URL do seu backend da Farmácia no Render. COLOQUE SUA URL DEPLOY REAL AQUI!
    const API_BASE_URL = "https://farmacia-jk1x.onrender.com/"; // <<<<< ATENÇÃO: SUBSTITUA PELA SUA URL REAL!

    const api = axios.create({
        baseURL: API_BASE_URL
    });
    console.log("API_BASE_URL configurada em Service.ts:", API_BASE_URL);


    // --- Funções Genéricas para Requisições CRUD (SEM TOKEN) ---
    export const buscar = async <T,>(url: string): Promise<T> => {
      const response = await api.get<T>(url);
      return response.data;
    };

    export const cadastrar = async <T,>(url: string, dados: Object): Promise<T> => {
      const response = await api.post<T>(url, dados);
      return response.data;
    };

    export const atualizar = async <T,>(url: string, dados: Object): Promise<T> => {
      const response = await api.put<T>(url, dados);
      return response.data;
    };

    export const deletar = async (url: string): Promise<void> => {
      await api.delete(url);
    };


    // --- Funções Específicas para Categoria (usando as genéricas) ---
    export const getAllCategorias = async (): Promise<Categoria[]> => {
      return await buscar<Categoria[]>('/categorias');
    };

    export const getCategoriaById = async (id: number): Promise<Categoria> => {
      return await buscar<Categoria>(`/categorias/${id}`);
    };

    export const getCategoriasByTipo = async (tipo: string): Promise<Categoria[]> => {
      return await buscar<Categoria[]>(`/categorias/tipo/${tipo}`);
    };

    export const postCategoria = async (categoria: Categoria): Promise<Categoria> => {
      return await cadastrar<Categoria>('/categorias', categoria);
    };

    export const putCategoria = async (categoria: Categoria): Promise<Categoria> => {
      return await atualizar<Categoria>('/categorias', categoria);
    };

    export const deleteCategoria = async (id: number): Promise<void> => {
      await deletar(`/categorias/${id}`);
    };

    // Helper para exibir toasts de erro comuns
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export const tratarErro = (error: any, mensagemPadrao: string = "Ocorreu um erro!") => {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                toast.error(`Recurso não encontrado: ${error.response.data.message || 'Verifique o ID ou URL.'}`);
            } else if (error.response.status === 409) {
                toast.error(`Conflito: ${error.response.data.message || 'Dados duplicados (ex: Tipo de Categoria já existe).'}`);
            } else if (error.response.data && error.response.data.message) {
                toast.error(`Erro: ${error.response.data.message}`);
            } else {
                toast.error(mensagemPadrao);
            }
        } else {
            console.error(error);
            toast.error(mensagemPadrao);
        }
    };