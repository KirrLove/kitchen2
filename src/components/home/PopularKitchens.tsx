
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const kitchens = [
  {
    id: 1,
    name: "Сатуко",
    material: "АГТ панели",
    price: 77100,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Греджи",
    material: "МДФ пленка",
    price: 40820,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Вайтлайн",
    material: "Эмаль",
    price: 48560,
    image: "/placeholder.svg"
  }
];

const PopularKitchens = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
          Популярные кухни
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kitchens.map((kitchen, index) => (
            <div
              key={kitchen.id}
              className="group relative rounded-xl overflow-hidden shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(kitchen.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={kitchen.image}
                alt={kitchen.name}
                className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="font-display text-2xl mb-2">
                  Кухня «{kitchen.name}»
                </h3>
                <p className="text-white/80 mb-4">{kitchen.material}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg">
                    от {kitchen.price.toLocaleString()} ₽/м.п.
                  </p>
                  <Link
                    to={`/kitchen/${kitchen.id}`}
                    className="button-primary !py-2 !px-4"
                  >
                    Подробнее
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularKitchens;
