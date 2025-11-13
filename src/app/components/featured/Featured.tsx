import FeaturedItem from "../featuredItem/FeaturedItem";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: { amount: string; formatted: string };
  category: { id: number };
  main_image: { url: string };
  created_at: string;
}

interface FeaturedProduct extends Product {
  category_name: string;
}

export default async function Featured() {

  const [productsRes, categoriesRes] = await Promise.all([
    fetch("https://front-test.r-link.io/api-user/products", {
      headers: {
        Accept: "application/json",
        "Accept-Language": "ar",
      },
      next: { revalidate: 60 }, 
    }),
    fetch("https://front-test.r-link.io/api-user/categories", {
      headers: {
        Accept: "application/json",
        "Accept-Language": "ar",
      },
      next: { revalidate: 3600 }, 
    }),
  ]);

  const products: Product[] = (await productsRes.json()).data;
  const categories: Category[] = (await categoriesRes.json()).data;

  // Map category_id → name
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  // Get latest per category
  const latestByCategory = Object.values(
    products.reduce((acc: Record<number, Product>, product) => {
      const catId = product.category.id;
      const current = acc[catId];
      if (!current || new Date(product.created_at) > new Date(current.created_at)) {
        acc[catId] = product;
      }
      return acc;
    }, {})
  );

  // Add category name
  const featuredProducts: FeaturedProduct[] = latestByCategory.map((p) => ({
    ...p,
    category_name: categoryMap[p.category.id] || "غير معروف",
  }));

  // Sort by newest
  featuredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <section id="featured" className="w-full py-16 md:py-24 bg-gradient-to-b from-zinc-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-950 mb-3">
            المنتجات المميزة
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            أحدث القطع من كل فئة — تم تحديثها تلقائيًا
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <FeaturedItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}