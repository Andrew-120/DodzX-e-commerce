import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ICategory } from "@/interfaces/category.interface";

export default function CategoryItem({ category }: { category: ICategory }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition group">
      <Link href={`/categories/${category._id}`}>
        <picture className="block overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            width={270}
            height={250}
            loading="lazy"
            className="w-full h-[15.625rem] object-contain bg-gray-200 mb-4 group-hover:scale-105 transition"
          />
        </picture>
      </Link>

      <h3 className="font-medium mb-2 line-clamp-1 text-center">
        <Link href={`/categories/${category._id}`}>{category.name}</Link>
      </h3>
    </div>
  );
}
