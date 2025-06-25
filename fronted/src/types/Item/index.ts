export interface Product {
  // id: string;
  name: string;
  categoryId: string;
  quantity: number;
  categoryName: string; 
}

export interface CartState {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  isError: string | null;
  orderId: any;
}

export interface Category{
  id: string,
  name: string
}