"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  image_url: string;
  products_count: number;
}

interface Props {
  category: Category;
  index: number;
}

export default function CategoryItem({ category, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="group cursor-pointer flex-1 min-w-[280px]"
    >
      <Link href={`/products?category_id=${category.id}`}>
        <div className="relative h-72 md:h-70 rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-1000"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-0 bg-slate-900/30 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl md:text-xl font-bold mb-1">{category.name}</h3>
            <p className="text-sm md:text-base opacity-90">{category.products_count} منتجات</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}