// src/models/Categoria.ts
import type Produto from "./Produto";

    export default interface Categoria {
        id?: number;
        nome: string;
        produtos?: Produto[] | null;
    }