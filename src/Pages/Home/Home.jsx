

import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";
import HowItWorks from './HowItWorks';
import OurMission from './OurMission';
import ThemeTest from '../../components/ThemeTest';

const Home = () => {
  

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <title>Home | Plateshare</title>
    
      <HeroSection></HeroSection>

    
      <FeaturedProducts></FeaturedProducts>

  
     <HowItWorks></HowItWorks>


      <OurMission></OurMission>

      <ThemeTest />
      
    </div>
  );
};

export default Home;






