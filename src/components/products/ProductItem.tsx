"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { IProduct } from "@/interfaces/product.interface";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import { addToWishlist, removeFromWishlist } from "@/services/wishlist.service";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

export default function ProductItem({ product }: { product: IProduct }) {
  const { wishlistDetails, getWishlistDetails } = useWishlist();
  const [isPending, startTransition] = useTransition();

  // check if product is already in wishlist
  const isInWishlist = wishlistDetails?.data?.some(
    (item) => item._id === product._id
  );

  function toggleWishlist() {
    startTransition(async () => {
      try {
        if (isInWishlist) {
          const res = await removeFromWishlist(product._id);
          if (res.success) {
            toast.success("Removed from wishlist", { position: "top-center" });
            await getWishlistDetails();
          } else {
            toast.error(res.message);
          }
        } else {
          const res = await addToWishlist(product._id);
          if (res.success) {
            toast.success("Added to wishlist", { position: "top-center" });
            await getWishlistDetails();
          } else {
            toast.error(res.message);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <div>
      <picture className="relative group overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageCover}
            alt={product.title}
            width={270}
            height={250}
            loading="lazy"
            className="w-full h-[15.625rem] object-contain bg-gray-200 mb-4"
          />
        </Link>

        <AddToCartBtn
          productId={product._id}
          className="w-full absolute bottom-0 translate-y-full group-hover:translate-y-0 invisible group-hover:visible"
        />
      </picture>

      <h3 className="font-medium mb-2 line-clamp-1">
        <Link href={`/products/${product._id}`}>{product.title}</Link>
      </h3>

      <div className="flex items-center gap-x-5">
        <span className="font-medium text-red-500">${product.price} EGP</span>

        <div className="flex items-center gap-x-1">
          <Star className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold text-gray-500">
            {product.ratingsAverage}
          </span>
        </div>

        
        <button onClick={toggleWishlist} disabled={isPending}>
          <Heart
            className={`h-5 w-5 transition ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-500"
            } ${isPending ? "opacity-50" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
