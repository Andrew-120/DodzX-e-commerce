"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWishlist } from "@/context/WishlistContext";
import { removeFromWishlist } from "@/services/wishlist.service";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function WishlistPage() {
  const { wishlistDetails, getWishlistDetails } = useWishlist();

  async function removeProductFromWishlist(productId: string) {
    const res = await removeFromWishlist(productId);

    if (res.success) {
      toast.success(res.message, { position: "top-center" });
      await getWishlistDetails();

    } else {
      toast.error(res.message || "Failed to remove product", {
        position: "top-center",
      });
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto">
        {wishlistDetails && wishlistDetails.data.length > 0 ? (
          <>
            <section className="mb-20">
              <Table className="mb-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wishlistDetails.data.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-5 relative">
                          <Badge
                            onClick={() => removeProductFromWishlist(product._id)}
                            variant={"destructive"}
                            className="absolute -top-0.5 -start-0.5 h-5 min-w-5 rounded-full cursor-pointer"
                          >
                            <X size={14} />
                          </Badge>
                          <Image
                            src={product.imageCover}
                            alt={product.title}
                            width={54}
                            height={54}
                            className="w-16 h-16 object-contain"
                          />
                          <h2>{product.title}</h2>
                        </div>
                      </TableCell>
                      <TableCell>{product.category?.name}</TableCell>
                      <TableCell>{product.brand?.name}</TableCell>
                      <TableCell className="text-right">
                        ⭐ {product.ratingsAverage}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-between">
                <Button variant="outline">
                  <Link href={"/products"}>Return to Shop</Link>
                </Button>
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
            <Button variant="outline">
              <Link href={"/products"}>Return to Shop</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
