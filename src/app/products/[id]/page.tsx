import axios from "axios";
import ProductDetail from "@/app/components/productDetail/ProductDetail";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const headers = {
  Accept: "application/json",
  "Accept-Language": "ar",
};

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
  created_at: string;
}

interface Props {
  params: { id: string };
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const { data } = await axios.get(`https://front-test.r-link.io/api-user/products/${id}`, { headers });
    const product: Product = data.data;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    return {
      title: `${product.name} | R-Link`,
      description: product.description || `تسوق ${product.name} بسعر ${product.price.formatted}`,
      alternates: {
        canonical: `${baseUrl}/products/${id}`,
      },
    };
  } catch {
    return {
      title: "المنتج غير موجود | R-Link",
      description: "المنتج الذي تبحث عنه غير متوفر حاليًا.",
    };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  try {
    const { data } = await axios.get(`https://front-test.r-link.io/api-user/products/${id}`, { headers });
    const product: Product = data.data;

    return <ProductDetail product={product} />;
  } catch (error) {
    notFound();
  }
}