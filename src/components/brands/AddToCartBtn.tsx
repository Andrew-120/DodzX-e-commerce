"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/services/cart.service";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { LoaderCircle } from "lucide-react";

export default function AddToCartBtn({
  brandId,
  ...props
}: {
  brandId: string;
  [key: string]: string;
}) {
  const { getCartDetails } = useCart();
  const [isPending, startTransition] = useTransition();
  async function addBrandToCart(brandId: string) {
    startTransition(async () => {
      const res = await addToCart(brandId);

      if (res.success) {
        toast.success(res.message, { position: "top-center" });
        getCartDetails();
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    });
  }

  return (
    <Button disabled={isPending} onClick={() => addBrandToCart(brandId)} {...props}>
      {isPending ? <LoaderCircle className="animate-spin" /> : "Add to Cart"}
    </Button>
  );
}
