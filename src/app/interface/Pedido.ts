export interface Lanche {
    ok: boolean;
    message?: string;
    nome: string;
    descricao: string;
    quantDispo: number;
    pedido: {
        id: number, 
        quantDispo: number
    }
}
