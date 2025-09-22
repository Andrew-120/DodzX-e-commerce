import { ICartResponse } from "@/interfaces/cart.interface";
import { getUserCart } from "@/services/cart.service";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ICartContext {
  cartDetails: ICartResponse | null;
  setCartDetails: React.Dispatch<React.SetStateAction<ICartResponse | null>>;
  getCartDetails: () => Promise<void>;
}

const CartContext = createContext<ICartContext | null>(null);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartDetails, setCartDetails] = useState<ICartResponse | null>(null);

  async function getCartDetails() {
    const data = await getUserCart();

    setCartDetails(data.data);
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <CartContext.Provider value={{ cartDetails, setCartDetails, getCartDetails }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
