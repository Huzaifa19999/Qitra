export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
  stock: number;
};

export type CartContextType = {
  items: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  addItem?: (product: any, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
};

export * from '@prisma/client';
