import { IBrand } from '@/interfaces/brand.interface';
import { getBrands } from '@/services/brands.service';
import BrandItem from '@/components/brands/BrandItem';
import React from 'react'


export default async function BrandsPage() {
 const { data: brands }: { data: IBrand[] } = await getBrands();
     
   return (
     <section className='pb-20'>
       <div className='container mx-auto'>
 
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15'>
             {brands && brands.map((brand) => (
           <BrandItem key={brand._id} brand={brand}/>
         ))}
         </div>
 
        
       </div>
     </section>
   )
}
