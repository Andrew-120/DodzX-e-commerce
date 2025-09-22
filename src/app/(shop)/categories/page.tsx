import { ICategory } from '@/interfaces/category.interface';
import { getCategories } from '@/services/categories.service';
import CategoryItem from '@/components/categories/CategoryItem';
import React from 'react';

export default async function CategoriesPage() {
  const { data: categories }: { data: ICategory[] } = await getCategories();

  return (
    <section className="pb-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {categories?.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
