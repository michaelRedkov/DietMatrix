import { create } from 'zustand'

export type Product = {
    id: string;
    name: string;
    price: number;
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
}

type ProductState = {
    products: Product[];
    addProduct: (initialData?: Partial<Product>) => string;
    updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
    removeProduct: (id: string) => void;
    clearProducts: () => void;
    saveProducts: (products: Product[]) => void;
}

const initialProducts: Product[] = [
    { id: '1', name: 'Гречка', price: 8, calories: 340, proteins: 12, fats: 3, carbs: 62 },
    { id: '2', name: 'Курица', price: 30, calories: 165, proteins: 31, fats: 3.6, carbs: 0 },
    { id: '3', name: 'Творог', price: 25, calories: 120, proteins: 18, fats: 5, carbs: 3 },
    { id: '4', name: 'Смесь овощей', price: 10, calories: 25, proteins: 1.5, fats: 0.2, carbs: 4 },
];

export const useProductStore = create<ProductState>((set) => ({
    products: initialProducts,

    addProduct: () => {
        const newId = crypto.randomUUID();
        set((state) => ({
            products: [
                ...state.products,
                { id: newId, name: 'Новый продукт', price: 0, calories: 0, proteins: 0, fats: 0, carbs: 0 }
            ]
        }));
        return newId;
    },


    updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map((p) => p.id === id ? { ...p, ...updatedProduct } : p)
    })),

    removeProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id)
    })),

    clearProducts: () => set({ products: [] }),

    saveProducts: (products) => set({ products }),
}))