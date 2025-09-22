import ProductItem from "@/components/products/ProductItem";
import { IProduct } from "@/interfaces/product.interface";
import React from "react";
import { IBrand } from "@/interfaces/brand.interface";
import { getBrandDetails, getProductsByBrand } from "@/services/brands.service";
import SectionTitle from "@/components/shared/SectionTitle";
import BrandItem from "@/components/brands/BrandItem";

export default async function BrandDetails({
  params: { brandId },
}: {
  params: { brandId: string };
}) {
  const { data: brand }: { data: IBrand } = await getBrandDetails(brandId);
  const { data: products }: { data: IProduct[] } = await getProductsByBrand(
    brandId
  );
  const { data: relatedProducts }: { data: IProduct[] } =
    await getProductsByBrand(brand._id, 8);

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="font-semibold text-2xl mb-10">{brand.name}</h1>

          {products?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p>No products found in this brand.</p>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="Related Products" subtitle="You may also like" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
            {relatedProducts &&
              relatedProducts.map((relatedProduct) => (
                <BrandItem
                  brand={relatedProduct.brand}
                  key={relatedProduct._id}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
