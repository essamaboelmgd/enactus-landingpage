import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Impact from '@/components/Impact';
import Team from '@/components/Team';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* <About /> */}
      {/* <Projects /> */}
      <Impact />
      <Team />
      <Partners />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
