"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import ProductItem from "../components/productItem/ProductItem";
import { useSearchParams } from "next/navigation";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Check } from "lucide-react";
import { Loader2 } from "lucide-react"; 
import LoadingSpinner from "../components/spinner/LoadingSpinner";

const ITEMS_PER_PAGE = 6;

const headers = {
  Accept: "application/json",
  "Accept-Language": "ar",
};

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: { amount: string; formatted: string };
  main_image: { url: string };
  category: { id: number; name: string };
  created_at: string;
}

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get("https://front-test.r-link.io/api-user/categories", { headers });
  return data.data;
};

const fetchProducts = async (params: URLSearchParams): Promise<Product[]> => {
  const { data } = await axios.get("https://front-test.r-link.io/api-user/products", {
    params,
    headers,
  });
  return data.data;
};

const toArabicNumeral = (num: number): string => {
  const arabic = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num).split("").map(d => arabic[+d]).join("");
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const urlCategoryId = searchParams.get("category_id");

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategoryId || "");
  const [sortBy, setSortBy] = useState<"created_at" | "price">("created_at");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category_id", selectedCategory);
    params.set("sort", sortBy === "created_at" ? "-created_at" : "price");
    return params;
  }, [selectedCategory, sortBy]);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", queryParams.toString()],
    queryFn: () => fetchProducts(queryParams),
  });

  useEffect(() => {
    if (urlCategoryId && urlCategoryId !== selectedCategory) {
      setSelectedCategory(urlCategoryId);
      setCurrentPage(1);
    }
  }, [urlCategoryId]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const selectedCategoryName = selectedCategory
    ? categories.find(c => c.id === Number(selectedCategory))?.name || "تصنيف"
    : "جميع التصنيفات";

  return (
    <Suspense fallback={<LoadingSpinner />}>
    <div dir="rtl" className="w-screen flex flex-col min-h-screen">
    
      <header
        style={{
          backgroundImage: "url('/products.webp')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="w-full h-64 flex justify-center items-center relative"
      >
        <div className="w-full h-full absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <h1 className="text-white text-3xl font-semibold z-10">منتجاتنا</h1>
      </header>

      <div className="container mx-auto px-4 py-8 flex gap-10 flex-col lg:flex-row">

        <aside>
          <Command className="w-64 h-full bg-slate-50 border shadow-md">
            <CommandInput placeholder="ابحث عن تصنيف أو ترتيب..." />
            <CommandList>
              <CommandEmpty>لا توجد نتائج</CommandEmpty>

              {/* Category Group */}
              <CommandGroup heading="التصنيف">
                <CommandItem
                  onSelect={() => {
                    setSelectedCategory("");
                    setCurrentPage(1);
                  }}
                  className="cursor-pointer"
                >
                  <Check className={`ml-2 h-4 w-4 ${!selectedCategory ? "opacity-100" : "opacity-0"}`} />
                  جميع التصنيفات
                </CommandItem>
                {categories.map((cat) => (
                  <CommandItem
                    key={cat.id}
                    onSelect={() => {
                      setSelectedCategory(String(cat.id));
                      setCurrentPage(1);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={`ml-2 h-4 w-4 ${selectedCategory === String(cat.id) ? "opacity-100" : "opacity-0"}`}
                    />
                    {cat.name}
                  </CommandItem>
                ))}
              </CommandGroup>

              {/* Sort Group */}
              <CommandGroup heading="ترتيب حسب">
                <CommandItem
                  onSelect={() => setSortBy("created_at")}
                  className="cursor-pointer"
                >
                  <Check className={`ml-2 h-4 w-4 ${sortBy === "created_at" ? "opacity-100" : "opacity-0"}`} />
                  الأحدث أولاً
                </CommandItem>
                <CommandItem
                  onSelect={() => setSortBy("price")}
                  className="cursor-pointer"
                >
                  <Check className={`ml-2 h-4 w-4 ${sortBy === "price" ? "opacity-100" : "opacity-0"}`} />
                  السعر: من الأقل
                </CommandItem>
                
              </CommandGroup>
       
            </CommandList>
      
          </Command>

         
        </aside>

       
        <main className="flex-1">
            
          <div className="text-sm mb-5 text-center text-muted-foreground">
            المختار: <strong>{selectedCategoryName}</strong>
            {sortBy === "price" && " • من الأقل إلى الأعلى"}
            {sortBy === "created_at" && " • الأحدث أولاً"}
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 py-10">لا توجد منتجات</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedProducts.map((product, index) => (
                  <ProductItem key={product.id} product={product} index={index} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {toArabicNumeral(page)}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </main>
      </div>
    </div>
    </Suspense>
  );
}