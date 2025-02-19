
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="font-display text-2xl">
            Кухни для людей
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/calculator" className="text-secondary hover:text-primary transition-colors">
              Расчет кухни
            </Link>
            <Link to="/ready-kitchens" className="text-secondary hover:text-primary transition-colors">
              Готовые кухни
            </Link>
            <Link to="/constructor" className="text-secondary hover:text-primary transition-colors">
              Конструктор
            </Link>
            <Link to="/services" className="text-secondary hover:text-primary transition-colors">
              Услуги
            </Link>
            <Link to="/about" className="text-secondary hover:text-primary transition-colors">
              О нас
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/calculator" className="text-secondary hover:text-primary transition-colors">
                Расчет кухни
              </Link>
              <Link to="/ready-kitchens" className="text-secondary hover:text-primary transition-colors">
                Готовые кухни
              </Link>
              <Link to="/constructor" className="text-secondary hover:text-primary transition-colors">
                Конструктор
              </Link>
              <Link to="/services" className="text-secondary hover:text-primary transition-colors">
                Услуги
              </Link>
              <Link to="/about" className="text-secondary hover:text-primary transition-colors">
                О нас
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
