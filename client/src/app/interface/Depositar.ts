export interface Depositar {
    ok: boolean;
    message?: string;
    id: number;
    saldo: number;
    pix?: string;
}
