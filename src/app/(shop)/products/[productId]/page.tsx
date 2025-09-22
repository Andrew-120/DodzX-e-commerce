import AddToCartBtn from "@/components/products/AddToCartBtn";
import ProductItem from "@/components/products/ProductItem";
import ProductSlider from "@/components/products/ProductSlider";
import SectionTitle from "@/components/shared/SectionTitle";
import { IProduct } from "@/interfaces/product.interface";
import {
  getProductsByCategory,
  getProductsDetails,
} from "@/services/products.service";
import { Star } from "lucide-react";
import React from "react";

export default async function ProductsDetails({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const { data: product }: { data: IProduct } = await getProductsDetails(
    productId
  );

  const { data: relatedProducts }: { data: IProduct[] } =
    await getProductsByCategory(product.category._id, 8);

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <ProductSlider images={product.images} />
            </div>
            <div className="lg:col-span-1">
              <h1 className="font-semibold text-2xl mb-4">{product.title}</h1>
              <div className="flex items-center gap-x-1 mb-4">
                <Star className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold text-gray-500">
                  {product.ratingsAverage}
                </span>
              </div>
              <span className="text-2xl mb-6 block">${product.price} EGP</span>
              <p className="text-sm pb-6 mb-6 border-b border-b-gray-400 ">
                {product.description}
              </p>

              <AddToCartBtn
                productId={product._id}
                className="w-full"
                variant={"destructive"}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="Related Products" subtitle="You may also like" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
            {relatedProducts &&
              relatedProducts.map((relatedProduct) => (
                <ProductItem
                  key={relatedProduct._id}
                  product={relatedProduct}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
