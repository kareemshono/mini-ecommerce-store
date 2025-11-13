import axios from "axios";
import CategoryItem from "../categoryItem/CategoryItem";

interface Category {
  id: number;
  name: string;
  image_url: string;
  products_count: number;
}

export default async function Categories() {

  const response = await axios.get("https://front-test.r-link.io/api-user/categories", {
    headers: {
      Accept: "application/json",
      "Accept-Language": "ar",
    },
  });

  const categories: Category[] = response.data.data;

  return (
    <section id="categories" className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-zinc-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-4xl font-bold text-slate-950 mb-3">
            التصنيفات
          </h1>
          <p className="text-lg md:text-md text-gray-600 max-w-2xl mx-auto">
            اكتشف أحدث المجموعات في ملابس الرجال والنساء والأطفال والرياضة
          </p>
        </div>

      
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch">
          {categories.map((category, index) => (
            <CategoryItem key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
   
    </section>
  );
}