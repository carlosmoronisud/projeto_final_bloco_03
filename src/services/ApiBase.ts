import axios from "axios";

const API_BASE_URL = "https://farmacia-jk1x.onrender.com"; // <<<<< SUA URL AQUI (SEM BARRA FINAL!)

const api = axios.create({
    baseURL: API_BASE_URL
});
console.log("Axios API_BASE_URL configurada em apiBase.ts:", API_BASE_URL);

export default api; // Exporta a instância configurada do Axios

// --- Funções Genéricas de Requisições ---
export const buscar = async <T,>(url: string): Promise<T> => {
    const response = await api.get<T>(url);
    return response.data;
};

export const cadastrar = async <T,>(url: string, dados: object): Promise<T> => {
    const response = await api.post<T>(url, dados);
    return response.data;
};

export const atualizar = async <T,>(url: string, dados: object): Promise<T> => {
    const response = await api.put<T>(url, dados);
    return response.data;
};

export const deletar = async (url: string): Promise<void> => {
    await api.delete(url);
};