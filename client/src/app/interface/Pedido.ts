export interface Pedido {
    ok?: boolean;
    message?: string;
    nome: string;
    descricao: string;
    quantDispo: number;
    pedidos: {
        lanches: [
            {
                nome: string;
                descricao: string;
                quantDispo: number;}
        ]
    };
}
