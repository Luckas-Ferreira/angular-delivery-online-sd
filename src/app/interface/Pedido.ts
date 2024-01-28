export interface Pedido {
    ok: boolean;
    message?: string;
    nome: string;
    descricao: string;
    quantDispo: number;
    pedidos: any;
    pedido: {
        id: number, 
        quantDispo: number
    }
}
