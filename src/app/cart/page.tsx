"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();

  if (items.length === 0) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold">السلة فارغة</h1>
          <p className="text-gray-600">لم تقم بإضافة أي منتجات بعد</p>
          <Link href="/products">
            <Button size="lg">تصفح المنتجات</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mt-12 mb-8">
          <h1 className="text-2xl font-semibold">سلة التسوق ({getTotalItems()})</h1>
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 ml-2" />
              متابعة التسوق
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
              className="flex gap-4 py-4 border-b last:border-0"
            >
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                <Image
                  src={item.main_image.url}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <div className="text-sm text-gray-600">
                  {item.selectedColor && <span>اللون: {item.selectedColor} • </span>}
                  {item.selectedSize && <span>المقاس: {item.selectedSize}</span>}
                </div>
                <div className="font-bold text-primary">{item.price.formatted}</div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-10 text-center font-bold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t pt-6">
            <div className="flex justify-between text-xl font-bold">
              <span>الإجمالي</span>
              <span className="text-primary">
                {getTotalPrice().toFixed(2)} $
              </span>
            </div>

            <div className="mt-12 flex gap-3">
              <Button size="lg" className="flex">
                إتمام الشراء
              </Button>
              <Button variant="outline" onClick={clearCart}>
                تفريغ السلة
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}