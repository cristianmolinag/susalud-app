export interface Usuario {
    id: number;
    nombres: string;
    apellidos: string;
    correo: string;
    password: string;
    estado: boolean;
    remember_token?: string;
    created_at?: Date;
    updated_at?: Date;
}
