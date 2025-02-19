import { useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronRight, Check, ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ContactForm from "@/components/shared/ContactForm";

interface ProductImage {
  id: number;
  image_url: string;
}

interface Specifications {
  Размеры: {
    [key: string]: string;
  };
  Материалы: {
    [key: string]: string;
  };
  Гарантия: string;
}

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  material: string | null;
  style: string | null;
  features: string[] | null;
  specifications: Specifications;
  images: ProductImage[];
}

const KitchenDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedLength, setSelectedLength] = useState("3");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) throw new Error('ID не указан');
      
      // Fetch product details
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', parseInt(id))
        .single();

      if (productError) throw productError;

      // Fetch product images
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', parseInt(id));

      if (imagesError) throw imagesError;

      // Parse specifications from JSON and validate its structure
      const specs = productData.specifications as Record<string, any>;
      if (!specs || typeof specs !== 'object') {
        throw new Error('Некорректный формат спецификаций');
      }

      const specifications: Specifications = {
        Размеры: specs.Размеры || {},
        Материалы: specs.Материалы || {},
        Гарантия: specs.Гарантия || '1 год'
      };

      return {
        ...productData,
        specifications,
        images: imagesData || []
      } as Product;
    }
  });

  if (isLoading) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl">Кухня не найдена</h1>
        </div>
      </div>
    );
  }

  const handleOrder = () => {
    setShowOrderForm(true);
  };

  const handleFormSubmit = () => {
    setShowOrderForm(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container mx-auto">
          {showOrderForm ? (
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setShowOrderForm(false)}
                className="mb-6 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Вернуться к просмотру кухни
              </button>
              <ContactForm 
                type="order"
                title={`Заказ кухни «${product?.name}»`}
                subtitle={`Выбранная длина: ${selectedLength} метра`}
                onSubmit={handleFormSubmit}
                additionalFields={{
                  product_id: product?.id,
                  product_name: product?.name,
                  length: selectedLength,
                  material: product?.material,
                  style: product?.style
                }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="relative group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={product.images[currentImageIndex]?.image_url}
                      alt={`${product.name} - изображение ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-center">
                          Изображение {currentImageIndex + 1} из {product.images.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.image_url}
                        alt={`${product.name} - миниатюра ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h1 className="font-display text-3xl md:text-4xl mb-4">
                  Кухня «{product.name}»
                </h1>
                
                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>

                <div className="space-y-8">
                  <div className="glass-panel p-6">
                    <h2 className="font-medium text-lg mb-4">Характеристики</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-muted-foreground">Материал фасадов</span>
                        <span className="font-medium">{product.material}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-muted-foreground">Стиль</span>
                        <span className="font-medium">{product.style}</span>
                      </div>
                      {Object.entries(product.specifications.Материалы).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center pb-2 border-b">
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-muted-foreground">Гарантия</span>
                        <span className="font-medium">{product.specifications.Гарантия}</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel p-6">
                    <h2 className="font-medium text-lg mb-4">Размеры</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications.Размеры).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-panel p-6">
                    <h2 className="font-medium text-lg mb-4">Преимущества</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-panel p-6">
                    <h2 className="font-medium text-lg mb-4">Расчет стоимости</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          Длина кухни
                        </label>
                        <select
                          value={selectedLength}
                          onChange={(e) => setSelectedLength(e.target.value)}
                          className="w-full p-3 border rounded-lg bg-background"
                        >
                          <option value="2">2 метра</option>
                          <option value="3">3 метра</option>
                          <option value="4">4 метра</option>
                          <option value="5">5 метров</option>
                        </select>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-muted-foreground">Стоимость за метр</span>
                          <span className="font-medium">{product.price.toLocaleString()} ₽</span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                          <span className="font-medium">Итого</span>
                          <span className="font-bold text-xl text-primary">
                            {(product.price * Number(selectedLength)).toLocaleString()} ₽
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleOrder}
                    className="button-primary w-full flex items-center justify-center gap-2 py-4"
                  >
                    Заказать кухню
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default KitchenDetails;
