import Hero from "./components/hero/Hero";
import Categories from "./components/categories/Categories";
import Featured from "./components/featured/Featured";
import { Suspense } from "react";
import LoadingSpinner from "./components/spinner/LoadingSpinner";

export default function Home() {
  return (
    <div className="w-screen box-border  ">
      <Suspense fallback={<LoadingSpinner />}>
            <Hero />
     <Categories />
     <Featured />
      </Suspense>
 
    </div>
  );
}
