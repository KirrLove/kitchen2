import { Users, Award, Factory, Clock, Star, Shield, Truck, WrenchIcon } from "lucide-react";

const stats = [
  { value: "20+", label: "лет опыта" },
  { value: "5000+", label: "довольных клиентов" },
  { value: "3", label: "производства" },
  { value: "150+", label: "сотрудников" }
];

const awards = [
  {
    year: "2023",
    title: "Лучший производитель кухонь",
    organization: "Мебельная ассоциация России"
  },
  {
    year: "2022",
    title: "Выбор потребителей",
    organization: "РБК Рейтинг"
  },
  {
    year: "2021",
    title: "Инновации в производстве",
    organization: "MebelExpo"
  }
];

const team = [
  {
    name: "Александр Петров",
    position: "Главный дизайнер",
    experience: "15 лет в мебельном дизайне",
    photo: "https://i.postimg.cc/SNX8F7vD/side-view-man-working-project.jpg"
  },
  {
    name: "Андрей Тиханов",
    position: "Руководитель производства",
    experience: "20 лет в мебельной индустрии",
    photo: "https://i.postimg.cc/rp9RChDF/real-estate-office-concept.jpg"
  },
  {
    name: "Михаил Волков",
    position: "Технический директор",
    experience: "12 лет опыта",
    photo: "https://i.postimg.cc/YqJFpLck/young-adult-dealing-with-imposter-syndrome.jpg"
  }
];

const features = [
  {
    icon: Factory,
    title: "Собственное производство",
    description: "Полный цикл производства на современном оборудовании"
  },
  {
    icon: Clock,
    title: "Точные сроки",
    description: "Строгое соблюдение сроков изготовления и монтажа"
  },
  {
    icon: Star,
    title: "Высокое качество",
    description: "Используем только сертифицированные материалы"
  },
  {
    icon: Shield,
    title: "Гарантия",
    description: "5 лет гарантии на всю продукцию"
  },
  {
    icon: Truck,
    title: "Доставка",
    description: "Бережная доставка собственным транспортом"
  },
  {
    icon: WrenchIcon,
    title: "Монтаж",
    description: "Профессиональная сборка и установка"
  }
];

const About = () => {
  return (
    <div className="pt-20">
      {/* История компании */}
      <section className="section-padding bg-accent">
        <div className="container mx-auto">
          <h1 className="font-display text-4xl md:text-5xl text-center mb-12">
            О компании
          </h1>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-8">
              С 2003 года мы создаем уникальные кухни, которые становятся центром домашнего уюта для наших клиентов. Начав с небольшой мастерской, мы выросли в современное производство с тремя фабриками и шоу-румами по всей России.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="font-display text-3xl text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="section-padding">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl text-center mb-12">
            Наши преимущества
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-accent rounded-xl"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="section-padding bg-accent">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl text-center mb-12">
            Наша команда
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="text-center"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-display text-xl mb-2">{member.name}</h3>
                <p className="text-primary mb-2">{member.position}</p>
                <p className="text-muted-foreground">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Награды */}
      <section className="section-padding">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl text-center mb-12">
            Награды и достижения
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <div 
                key={index}
                className="p-6 bg-accent rounded-xl text-center"
              >
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-xl font-display mb-2">{award.year}</div>
                <h3 className="font-medium mb-2">{award.title}</h3>
                <p className="text-muted-foreground">{award.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Производство */}
      <section className="section-padding bg-accent">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl text-center mb-12">
            Наше производство
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <img
                src="https://biz-nes.ru/wp-content/uploads/2023/07/kupi_gotoviy_biznes-407.jpg"
                alt="Производство"
                className="rounded-xl w-full"
              />
            </div>
            <div>
              <h3 className="font-display text-2xl mb-4">
                Современные технологии
              </h3>
              <p className="text-muted-foreground mb-6">
                Наше производство оснащено современным оборудованием от ведущих производителей. Это позволяет нам создавать мебель высочайшего качества с точностью до миллиметра.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Factory className="w-5 h-5 text-primary" />
                  Автоматизированные линии раскроя
                </li>
                <li className="flex items-center gap-2">
                  <Factory className="w-5 h-5 text-primary" />
                  Роботизированное кромкооблицовочное оборудование
                </li>
                <li className="flex items-center gap-2">
                  <Factory className="w-5 h-5 text-primary" />
                  Современный покрасочный цех
                </li>
                <li className="flex items-center gap-2">
                  <Factory className="w-5 h-5 text-primary" />
                  Система контроля качества на каждом этапе
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
