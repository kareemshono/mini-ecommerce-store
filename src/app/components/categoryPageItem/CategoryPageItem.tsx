import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface Category {
  id: number;
  name: string;
  description: string;
  image_url: string;
  products_count: number;
}

interface Props {
  category: Category;
}

export default function CategoryPageItem({ category }: Props) {
  return (
    <Card className="group p-0 pb-3 h-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
      <div className="relative h-56 md:h-56">
        <Image
          src={category.image_url}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 "
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
          <p className="text-sm opacity-90">{category.products_count} منتجات</p>
        </div>
      </div>

      <CardContent className="p-3">
        <CardDescription className="text-gray-600 line-clamp-2">
          {category.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <p className="text-sm text-primary font-medium">عرض المنتجات →</p>
      </CardFooter>
    </Card>
  );
}