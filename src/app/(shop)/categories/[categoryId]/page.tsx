import ProductItem from "@/components/products/ProductItem";
import {
  getCategoryDetails,
  getProductsByCategory,
} from "@/services/categories.service";
import { ICategory } from "@/interfaces/category.interface";
import { IProduct } from "@/interfaces/product.interface";
import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import CategoryItem from "@/components/categories/CategoryItem";

export default async function CategoriesDetails({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  const { data: category }: { data: ICategory } = await getCategoryDetails(
    categoryId
  );
  const { data: products }: { data: IProduct[] } = await getProductsByCategory(
    categoryId
  );
  const { data: relatedProducts }: { data: IProduct[] } =
    await getProductsByCategory(category._id, 8);

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="font-semibold text-2xl mb-10">{category.name}</h1>

          {products?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="Related Products" subtitle="You may also like" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
            {relatedProducts &&
              relatedProducts.map((relatedProduct) => (
                <CategoryItem
                  category={relatedProduct.category}
                  key={relatedProduct._id}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
