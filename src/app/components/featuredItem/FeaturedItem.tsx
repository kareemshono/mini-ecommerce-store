"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/store";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: { amount: string; formatted: string };
  category_name: string;
  main_image: { url: string };
}

interface Props {
  product: Product;
}

export default function FeaturedItem({ product }: Props) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success("تمت الإضافة!", {
      description: `${product.name} تم إضافته إلى السلة`,
      duration: 3000,
      action: {
        label: "عرض السلة",
        onClick: () => window.location.href = "/cart",
      },
    });
  };

  return (
    <Card className="w-full max-w-sm p-0 pb-2 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="relative h-64 rounded-t-xl overflow-hidden">
            <Image
              src={product.main_image.url}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-indigo-600 font-medium mb-1">{product.category_name}</p>
        <h3 className="text-md font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-lg font-bold text-gray-800">{product.price.formatted}</p>
      </CardContent>
      <CardFooter className="flex justify-between pb-3 items-center">
        <Button asChild size="sm">
          <Link href={`/products/${product.id}`}>عرض التفاصيل</Link>
        </Button>
        <Button className="cursor-pointer" variant="outline" size="sm" onClick={handleAddToCart}>
         <ShoppingCart />
          أضف للسلة
        </Button>
      </CardFooter>
    </Card>
  );
}