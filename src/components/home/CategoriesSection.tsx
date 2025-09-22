import { getCategories } from '@/services/categories.service';
import CategoriesSlider from './CategoriesSlider';
import { ICategory } from '@/interfaces/category.interface';
import SectionTitle from '../shared/SectionTitle';
import { Separator } from '../ui/separator';


export default async function CategoriesSection() {

    

    const {data : categories} : {data: ICategory[]} = await getCategories();
    console.log(categories);

  return (
    <section className='mb-20'>
        <div className='container mx-auto'>
            <SectionTitle title ={"Categories"} subtitle ={"Browse By Category"}/>
            
            <CategoriesSlider categories={categories}/>
            
            <Separator />
        
        </div>

    </section>
  )
}
