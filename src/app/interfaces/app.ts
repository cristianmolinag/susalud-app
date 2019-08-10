export interface Cliente {
    id: number;
    nombres: string;
    apellidos: string;
    correo: string;
    documento: number;
    estado: boolean;
    remember_token?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface Categoria {
    id: number;
    nombre: string;
    slug: string;
    estado: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface Color {
    id: number;
    nombre: string;
    slug: string;
    estado: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface Talla {
    id: number;
    nombre: string;
    slug: string;
    estado: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface Material {
    id: number;
    nombre: string;
    slug: string;
    estado: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface Articulo {
    id: number;
    nombre: string;
    slug: string;
    estado: boolean;
    categoria_id: number;
    categoria: Categoria;
    created_at?: Date;
    updated_at?: Date;
}

export interface Producto {
    id: number;
    nombre: string;
    imagen: string;
    precio: number;
    estado: boolean;
    colores: Color[];
    tallas: Talla[];
    material_id: number;
    material: Material;
    created_at?: Date;
    updated_at?: Date;
}

export interface Pedido {
    id: number;
    cantidad: number;
    cliente_id: number;
    cliente: Cliente;
    producto_id: number;
    producto: Producto;
    estado: string;
    observaciones?: string;
    created_at?: Date;
    updated_at?: Date;
}
