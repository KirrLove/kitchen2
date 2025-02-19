
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import PopularKitchens from "@/components/home/PopularKitchens";
import Testimonials from "@/components/home/Testimonials";
import ContactForm from "@/components/shared/ContactForm";
import KitchenTabs from "@/components/home/KitchenTabs";

const Index = () => {
  return (
    <div className="pt-20">
      <Hero />
      <Features />
      <KitchenTabs />
      <PopularKitchens />
      <Testimonials />
      <section className="section-padding bg-accent">
        <div className="container max-w-xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default Index;
