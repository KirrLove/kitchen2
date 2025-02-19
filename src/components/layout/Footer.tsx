
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-2xl mb-4">Кухни для людей</h3>
            <p className="text-gray-300">
              С 2003 года изготавливаем кухни на заказ на собственной фабрике мебели в Москве
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-4">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={18} />
                <a href="tel:+74951234567" className="hover:text-primary transition-colors">
                  +7 (495) 123-45-67
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={18} />
                <a href="mailto:info@kitchens.ru" className="hover:text-primary transition-colors">
                  info@kitchens.ru
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={18} />
                <span>Москва, ул. Примерная, д. 1</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-4">Время работы</h4>
            <p className="text-gray-300">
              Пн-Пт: 9:00 - 20:00<br />
              Сб-Вс: 10:00 - 18:00
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          © 2024 Кухни для людей. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
