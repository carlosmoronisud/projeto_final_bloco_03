// src/services/tratarErro.ts
import { toast } from 'react-toastify';
import axios from 'axios'; // Para axios.isAxiosError

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
}