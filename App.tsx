
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import HealthSection from './components/HealthSection';
import PracticalInfo from './components/PracticalInfo';
import PlayerRegistration from './components/PlayerRegistration';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import SocialNetworks from './components/SocialNetworks.tsx';
import Gallery from './components/Gallery';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section id="home">
          <Hero />
        </section>
        
        <section id="club" className="py-20">
          <About />
        </section>

        <section id="programs" className="bg-gray-100 py-20">
          <Programs />
        </section>

        <section id="gallery" className="py-20">
          <Gallery />
        </section>

        <section id="registration" className="py-20">
          <PlayerRegistration />
        </section>

        <section id="health" className="py-20">
          <HealthSection />
        </section>

        <section id="info" className="bg-gray-900 text-white py-20">
          <PracticalInfo />
        </section>

        <section id="social">
          <SocialNetworks />
        </section>
      </main>

      <ChatBot />
      <Footer />
    </div>
  );
};

export default App;
