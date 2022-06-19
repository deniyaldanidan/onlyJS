import './App.css';
import CTA from './layouts/CTA';
import Features from './layouts/Features';
import Footer from './layouts/Footer';
import Info from './layouts/Info';
import Testimonials from './layouts/Testimonials';
import Top from './layouts/Top';

function App() {
    return (
      <div className='bg-dBlueMain'>
        <Top />
        <Features />
        <Info/>
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    );
}

export default App;
