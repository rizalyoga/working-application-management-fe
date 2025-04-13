import HeroSectionComponent from "../page-components/HeroSection";
import NavbarComponent from "../navigations/Navbar";
import FeatureSectionComponent from "../page-components/FeatureSection";
import HowItWorkSection from "../page-components/HowItWorkSection";
import DemoVideoSection from "../page-components/DemoVideoSection";
import PricingSection from "../page-components/PricingSection";
import TestimonialSection from "../page-components/TestimonialSection";
import CTASection from "../page-components/CTASection";
import Footer from "../navigations/Footer";

const LandingPageComponent = () => {
  return (
    <>
      <NavbarComponent />
      <HeroSectionComponent />
      <FeatureSectionComponent />
      <HowItWorkSection />
      <DemoVideoSection />
      <PricingSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default LandingPageComponent;
