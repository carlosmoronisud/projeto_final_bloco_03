// src/services/CategoriaService.ts
import { atualizar, buscar, cadastrar, deletar } from './ApiBase';
import type Categoria from '../components/models/Categoria';


// --- Funções Específicas para Categoria ---
export const getAllCategorias = async (): Promise<Categoria[]> => {
    return await buscar<Categoria[]>('/categorias');
};

export const getCategoriaById = async (id: number): Promise<Categoria> => {
    return await buscar<Categoria>(`/categorias/${id}`);
};

export const getCategoriasByNome = async (nome: string): Promise<Categoria[]> => {
    return await buscar<Categoria[]>(`/categorias/nome/${nome}`);
};

export const postCategoria = async (categoria: Categoria): Promise<Categoria> => {
    const payload = {
        id: 0,
        nome: categoria.nome,
    };
    return await cadastrar<Categoria>('/categorias', payload);
};

export const putCategoria = async (categoria: Categoria): Promise<Categoria> => {
    const payload = {
        id: categoria.id,
        nome: categoria.nome,
    };
    return await atualizar<Categoria>('/categorias', payload);
};

export const deleteCategoria = async (id: number): Promise<void> => {
    await deletar(`/categorias/${id}`);
};