import axios from "axios";
import Link from "next/link";
import CategoryPageItem from "../components/categoryPageItem/CategoryPageItem";
import { Metadata } from "next";

interface Category {
  id: number;
  name: string;
  description: string;
  image_url: string;
  products_count: number;
}

const headers = {
  Accept: "application/json",
  "Accept-Language": "ar",
};


export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const { data } = await axios.get("https://front-test.r-link.io/api-user/categories", { headers });
    const categories: Category[] = data.data;
    const totalProducts = categories.reduce((sum, cat) => sum + cat.products_count, 0);

    return {
      title: "التصنيفات | R-Link",
      description: `استكشف ${categories.length} تصنيفات تحتوي على ${totalProducts} منتج — للرجال، النساء، الأطفال، والرياضة.`,
      alternates: {
        canonical: `${baseUrl}/categories`,
      },
    };
  } catch {
    return {
      title: "التصنيفات | R-Link",
      description: "اكتشف مجموعتنا الواسعة من المنتجات عبر جميع التصنيفات.",
      alternates: {
        canonical: `${baseUrl}/categories`,
      },
    };
  }
}

export default async function CategoriesPage() {
  const { data } = await axios.get("https://front-test.r-link.io/api-user/categories", { headers });
  const categories: Category[] = data.data;

  return (
    <div className="w-screen flex flex-col min-h-screen">

      <header
        style={{
          backgroundImage: "url('/categories_1.webp')",
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
        className="w-full h-64 flex justify-center items-center relative"
      >
        <div className="w-full h-full absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <h1 className="text-white text-3xl md:text-4xl font-bold z-10">التصنيفات</h1>
      </header>

      <section className="container mx-auto px-4 py-12">
        <p className="text-lg text-center mb-10 mx-auto md:text-lg max-w-2xl opacity-90">
          اختر من بين مجموعة واسعة من المنتجات المصممة خصيصًا لكل احتياج
        </p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`
                w-full sm:w-80 md:w-64
                ${index % 2 === 1 ? "md:mt-12" : "md:mt-0"}
                transition-all duration-300 hover:mt-0 hover:shadow-2xl
              `}
            >
              <Link href={`/products?category_id=${category.id}`}>
                <CategoryPageItem category={category} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}