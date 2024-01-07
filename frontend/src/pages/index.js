import About from "@/components/About/About";
import Book from "@/components/Booking/Booking";

import Faq from "@/components/Faq/Faq";
import Header from "@/components/Header/Header";
import Services from "@/components/Services/Services";
import Testimonials from "@/components/Testimonials/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <Header />
      <div className="hidden xl:inline xl:absolute xl:top-[10%] xl:-right-20 xl:w-[1000] -z-50">
        <Image
          loading="eager"
          width={603}
          height={1369}
          src="/assets/blackCercle.webp"
          alt="taxi_vip"
        />
      </div>
      <About />
      <div className="hidden xl:inline xl:absolute xl:top-[30%] xl:left-0 xl:w-[1000] -z-50">
        <Image
          loading="eager"
          width={547}
          height={1144}
          src="/assets/yellowCercle.webp"
          alt="taxi_vip"
        />
      </div>
      <Services />
      <Book image="/assets/girl.webp" />
      <div className="hidden xl:inline xl:absolute xl:top-[60%] xl:right-0 xl:w-[1000] -z-50">
        <Image
          loading="eager"
          width={603}
          height={1369}
          src="/assets/blackCercle.webp"
          alt="taxi_vip"
        />
      </div>
      <Testimonials />
      <Faq />
    </div>
  );
}
