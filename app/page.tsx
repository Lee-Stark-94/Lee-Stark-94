import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SobreMi from "@/components/SobreMi";
import Habilidades from "@/components/Habilidades";
import Caracteristicas from "@/components/Caracteristicas";
import Hobbies from "@/components/Hobbies";
import Historia from "@/components/Historia";
import Vision from "@/components/Vision";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SobreMi />
        <Habilidades />
        <Caracteristicas />
        <Hobbies />
        <Historia />
        <Vision />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
