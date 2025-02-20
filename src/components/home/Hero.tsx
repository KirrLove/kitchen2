
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center bg-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in">
            Кухни на заказ от производителя в Москве
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animation-delay-200 animate-fade-in">
            С 2003 года мы изготавливаем кухни под заказ на собственной фабрике мебели. 
            Воплощаем стиль и качество в каждом проекте.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animation-delay-400 animate-fade-in">
            <Link to="/calculator" className="button-primary">
              Рассчитать стоимость
            </Link>
            <Link to="/ready-kitchens" className="button-secondary inline-flex items-center">
              Смотреть работы
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
