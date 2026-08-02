import HeroSection from '@/components/HeroSection';
import CameraScrollTransition from '@/components/CameraScrollTransition';
import AboutSection from '@/components/AboutSection';
import VistaraSection from '@/components/VistaraSection';
import VideoGallery from '@/components/VideoGallery';
import ClientsCarousel from '@/components/ClientsCarousel';
import EnquiryForm from '@/components/EnquiryForm';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  return (
    <main className="relative w-full overflow-x-clip">
      {/* Hero Section with Tubes Background */}
      <HeroSection />

      {/* Smooth Standalone Camera Lens & Flash Transition */}
      <CameraScrollTransition />

      {/* About Section ("The Vistara Experience") in natural document flow */}
      <AboutSection />

      {/* Vistara Services Section */}
      {/* <VistaraSection /> */}

      {/* Video Portfolio Gallery */}
      <VideoGallery />

      {/* Clients Marquee / Carousel */}
      <ClientsCarousel />

      {/* Contact/Enquiry Form */}
      <EnquiryForm />

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm"> 
            © 2024 Vistara. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Crafted with passion by a BBA student & video editing enthusiast
          </p>
        </div>
      </footer>

      {/* Smooth Scroll Component */}
      <SmoothScroll />
    </main>
  );
}