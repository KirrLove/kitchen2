import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProductImage {
  id: number;
  image_url: string;
}

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  material: string | null;
  style: string | null;
  images: ProductImage[];
}

const ReadyKitchens = () => {
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, description, price, material, style');
      
      if (productsError) {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить товары",
          variant: "destructive"
        });
        throw productsError;
      }

      // Fetch images for all products
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*');

      if (imagesError) {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить изображения товаров",
          variant: "destructive"
        });
        throw imagesError;
      }

      // Combine products with their images
      const productsWithImages = productsData.map(product => ({
        ...product,
        images: imagesData.filter(image => image.product_id === product.id) || []
      }));
      
      return productsWithImages as Product[];
    }
  });

  const filteredProducts = filter === "all" 
    ? products 
    : products?.filter(product => 
        product.style?.toLowerCase() === filter.toLowerCase()
      );

  if (isLoading) {
    return (
      <div className="pt-20">
        <div className="container mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container mx-auto">
          <h1 className="font-display text-4xl md:text-5xl text-center mb-8">
            Готовые кухни
          </h1>

          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "all" ? "bg-primary text-white" : "bg-accent"
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setFilter("современный")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "современный" ? "bg-primary text-white" : "bg-accent"
              }`}
            >
              Современные
            </button>
            <button
              onClick={() => setFilter("классический")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "классический" ? "bg-primary text-white" : "bg-accent"
              }`}
            >
              Классические
            </button>
            <button
              onClick={() => setFilter("лофт")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "лофт" ? "bg-primary text-white" : "bg-accent"
              }`}
            >
              Лофт
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts?.map((product) => (
              <div key={product.id} className="glass-panel overflow-hidden group">
                <Link to={`/kitchen/${product.id}`} className="block">
                  <div className="relative">
                    <img 
                      src={product.images[0]?.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full aspect-video object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-medium">Подробнее</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl mb-2">
                      Кухня «{product.name}»
                    </h3>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Стиль</span>
                        <span className="font-medium">{product.style}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Материал</span>
                        <span className="font-medium">{product.material}</span>
                      </div>
                      <div className="pt-4 border-t">
                        <p className="font-medium text-lg text-center">
                          от {product.price.toLocaleString()} ₽/м.п.
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReadyKitchens;
