"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/services/cart.service";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { LoaderCircle } from "lucide-react";

export default function AddToCartBtn({
  categoryId,
  ...props
}: {
  categoryId: string;
  [key: string]: string;
}) {
  const { getCartDetails } = useCart();
  const [isPending, startTransition] = useTransition();
  async function addCategoryToCart(categoryId: string) {
    startTransition(async () => {
      const res = await addToCart(categoryId);

      if (res.success) {
        toast.success(res.message, { position: "top-center" });
        getCartDetails();
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    });
  }

  return (
    <Button disabled={isPending} onClick={() => addCategoryToCart(categoryId)} {...props}>
      {isPending ? <LoaderCircle className="animate-spin" /> : "Add to Cart"}
    </Button>
  );
}
