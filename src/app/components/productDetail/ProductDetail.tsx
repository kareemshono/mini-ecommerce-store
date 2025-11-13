"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { ShoppingCart, Plus, Minus, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { useCart } from "@/lib/store";
import { toast } from "sonner";  
import { useRouter } from "next/navigation";



interface Product {
  id: number;
  name: string;
  description: string;
  price: { amount: string; formatted: string };
  category: { id: number; name: string };
  main_image: { url: string };
  gallery_images: Array<{ id: number; url: string }>;
  colors: Array<{ id: number; name: string }>;
  sizes: Array<{ id: number; name: string }>;
}

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id.toString() || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.id.toString() || "");

const { addItem } = useCart();
const router = useRouter()
const handleAddToCart = () => {
  addItem(
    product,
    quantity,
    selectedColor || undefined,
    selectedSize || undefined
  );
toast.success(`تمت الإضافة!`, {
      description: `${product.name} × ${quantity} مضاف إلى السلة`,
      duration: 3000,
      action: {
        label: "عرض السلة",
        onClick: () => router.push("/cart"),  
      },
    });
};

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

      <div className="w-full max-w-5xl h-[80vh] mt-10 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">


        <div className="relative w-full lg:w-1/2 h-64 lg:h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
          <div className="relative w-full h-full max-w-md max-h-full">
            <Image
              src={product.main_image.url}
              alt={product.name}
              width={300}
              height={400}
              priority
              className="rounded-xl shadow-lg object-contain mx-auto"
            />
          </div>

          {product.gallery_images.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
              {product.gallery_images.slice(0, 5).map((img) => (
                <div
                  key={img.id}
                  className="relative w-14 h-14 rounded-lg overflow-hidden border-2 border-white/80 shadow cursor-pointer hover:border-primary transition"
                >
                  <Image src={img.url} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 p-5 lg:p-7 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-1">

            <Link href="/products">
              <Button variant="ghost" size="sm" className="mb-3 cursor-pointer text-sm flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                العودة إلى المنتجات
              </Button>
            </Link>

            {/* Name */}
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 line-clamp-2">
              {product.name}
            </h1>

            {/* Category + Availability */}
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                {product.category.name}
              </Badge>
              <span className="text-green-600 font-medium">متاح</span>
            </div>

            {/* Price */}
            <div className="text-2xl lg:text-xl font-bold text-primary">
              {product.price.formatted}
            </div>

            {/* Description */}
            <p className="text-xs lg:text-sm text-gray-600 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Color */}
            {product.colors.length > 0 && (
              <div>
                <label className="text-xs font-semibold block mb-1">اللون</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Size */}
            {product.sizes.length > 0 && (
              <div>
                <label className="text-xs font-semibold block mb-1">المقاس</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-xs font-semibold block mb-1">الكمية</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity === 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-10 text-center font-bold text-sm">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            size="lg"
            className="w-full h-8 cursor-pointer text-sm font-medium mt-5 flex items-center justify-center gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            إضافة إلى السلة
          </Button>
        </div>
      </div>
    </div>
  );
}