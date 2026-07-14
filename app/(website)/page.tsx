import Navbar from "./(shared)/Navbar";
import Hero from "./(shared)/Hero";
import Stats from "./(shared)/Stats";
import About from "./(shared)/About";
import Services from "./(shared)/Services";
import Contact from "./(shared)/Contact";
import Footer from "./(shared)/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased text-[#020F2E]">
      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        {/* <Stats /> */}
        <About />
        <Services />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
