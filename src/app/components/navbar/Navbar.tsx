
"use client";
import { ShoppingCart, X, Menu } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/store";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const Navbar = () => {
  const { items, getTotalItems, getTotalPrice } = useCart();
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const forceGradient = pathname.startsWith("/cart") || /^\/products\/\d+$/.test(pathname);

  const baseBg = "bg-white/5 backdrop-blur-md";
  const gradientBg = "bg-gradient-to-r from-indigo-900/90 via-fuchsia-900/90 to-slate-900/90 backdrop-blur-md";
  const bgClass = forceGradient || scrolled ? gradientBg : baseBg;


  const handleFeaturedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (pathname === "/") {
      document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#featured");
    }
  };

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/products", label: "منتجاتنا" },
    { href: "/categories", label: "التصنيفات" },
    { href: "/#featured", label: "المميزة", onClick: handleFeaturedClick },
  ];

  return (
    <div
      dir="rtl"
      className={`w-full ${bgClass} fixed top-0 z-50 transition-all duration-300 border-b border-white/10`}
    >
      <nav className="w-full py-5 px-6 flex justify-between items-center container mx-auto">
        

        <Sheet  open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-white/95 p-5 backdrop-blur-md border-l-0">
            <SheetTitle className="sr-only">القائمة</SheetTitle>
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.onClick) link.onClick(e);
                    setMobileOpen(false);
                  }}
                  className="text-lg font-medium text-gray-800 hover:text-primary transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <ul className="hidden lg:flex gap-6 text-white/80 font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.onClick ? (
                <a
                  href={link.href}
                  onClick={link.onClick}
                  className="hover:text-white transition cursor-pointer"
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className="hover:text-white transition">
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>


        <div className="relative">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-white hover:text-white transition"
            onMouseEnter={() => setShowCartPreview(true)}
            onMouseLeave={() => setShowCartPreview(false)}
            onClick={() => setMobileOpen(false)}
          >
            <ShoppingCart className="h-6 w-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {getTotalItems()}
              </span>
            )}
          </Link>

          {showCartPreview && items.length > 0 && (
            <div
              className="absolute top-full mt-3 right-0 w-80 bg-white rounded-xl shadow-2xl border overflow-hidden z-50"
              onMouseEnter={() => setShowCartPreview(true)}
              onMouseLeave={() => setShowCartPreview(false)}
            >
              <div className="p-4 border-b bg-gradient-to-r from-indigo-50 to-fuchsia-50">
                <h3 className="font-bold text-lg text-gray-800">سلة التسوق</h3>
              </div>

              <div className="max-h-96 overflow-y-auto p-2">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border">
                      <Image
                        src={item.main_image.url}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.selectedColor && `${item.selectedColor}`}
                        {item.selectedColor && item.selectedSize && " • "}
                        {item.selectedSize && `${item.selectedSize}`}
                      </p>
                      <p className="text-primary font-semibold">
                        {item.price.formatted} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between font-bold mb-3">
                  <span>الإجمالي</span>
                  <span className="text-primary">{getTotalPrice().toFixed(2)} $</span>
                </div>
                <div className="flex gap-2">
                  <Link href="/cart" className="flex-1">
                    <Button size="sm" className="w-full">
                      عرض السلة
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline" className="px-3">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;