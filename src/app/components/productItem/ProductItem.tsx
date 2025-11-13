"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: { amount: string; formatted: string };
  main_image: { url: string };
  category: { id: number; name: string }; 
}

interface Props {
  product: Product;
  index: number;
}

export default function ProductItem({ product, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <Card className="relative h-70 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
          <Image
            src={product.main_image.url}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="text-xl font-bold mb-1">{product.name}</h3>
            <p className="text-sm opacity-90">{product.category.name}</p>
            <p className="text-lg font-semibold mt-2">{product.price.formatted}</p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}