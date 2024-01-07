import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Reveal from "@/utils/Reveal";
import { useTranslation } from "next-i18next";
import Image from "next/image";
const Testimonials = () => {
  const { t } = useTranslation("common");

  const testimonials = [
    {
      image: "/assets/client.webp",
      clienName: `${t("testimonial1name")}`,
      feedback: `${t("testimonial1describe")}`,
      date: "2023-01-15",
    },
    {
      image: "/assets/client.webp",
      clienName: `${t("testimonial2name")}`,
      feedback: `${t("testimonial2describe")}`,
      date: "2023-02-20",
    },
    {
      image: "/assets/client.webp",
      clienName: `${t("testimonial3name")}`,
      feedback: `${t("testimonial3describe")}`,
      date: "2023-03-05",
    },
    {
      image: "/assets/client.webp",
      clienName: `${t("testimonial4name")}`,
      feedback: `${t("testimonial4describe")}`,
      date: "2023-04-07",
    },
  ];
  const TestimonialsCard = ({ image, clienName, feedback, date }) => (
    <div className="rounded-3xl flex flex-col bg-white p-8 justify-center items-center w-full xl:w-[364px] gap-6 border ">
      <div className="w-[100px] h-[100px] bg-gradient-to-b from-[#767676] to-[#AAAAAA] rounded-full text-center text-[40px] text-white">
        <p className="text-center mt-5">{clienName[0]}</p>
      </div>
      <span className="font-bold">{clienName}</span>
      <p className="max-w-[250px] font-light">{feedback}</p>
      <span className="mt-4 font-light text-[#767676]">{date}</span>
    </div>
  );
  const TestimonialsFeedBack = () => (
    <div className="flex flex-col justify-center items-start p-6 sm:p-12 md:p-24 gap-4 sm:gap-8 md:gap-12 md:ml-28">
      <span className="text-[#FEC401] text-[24px] sm:text-[32px]">
        {t("testimonialsTitle")}
      </span>
      <h2 className="text-[bold] text-[36px] sm:text-[60px] max-w-[85%]">
        {t("testimonialsDescribe")}
      </h2>
      <div className="flex relative gap-2 ">
        <Image
          loading="eager"
          width={50}
          height={50}
          src="/assets/client1.webp"
          alt="taxi-vip-service"
          className="w-[50px] h-[50px] rounded-full"
          style={{ zIndex: 1 }}
        />

        <Image
          loading="eager"
          width={50}
          height={(50 * 16) / 9}
          src="/assets/client2.webp"
          alt="taxi-vip-service"
          className="w-[50px] h-[50px] rounded-full ring-white ring-4 "
          style={{ zIndex: 2, marginLeft: "-23px" }}
        />

        <Image
          loading="eager"
          width={50}
          height={(50 * 16) / 9}
          src="/assets/client3.webp"
          alt="taxi-vip-service"
          className="w-[50px] h-[50px] rounded-full ring-white  ring-4"
          style={{ zIndex: 3, marginLeft: "-18px" }}
        />
        <div className="mt-2">
          <span className="text-[20px] font-bold sm:text-[22px]">
            {" "}
            <span style={{ color: "gold" }}>★</span> 4.9
          </span>
          <span className="text-[#767676] text-[20px] sm:text-[22px]">
            (18.6k Reviews)
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="  flex flex-col md:flex-row md:justify-between md:items-center  ">
      <Reveal
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <TestimonialsFeedBack />
      </Reveal>
      <div className="w-full md:w-[30%] flex flex-row justify-center items-center ">
        <Swiper
          className="w-[90%] flex flex-row justify-center items-center"
          loop={true}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              className="w-[80%] flex flex-row justify-center items-center"
              key={index}
            >
              <Reveal
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <TestimonialsCard {...testimonial} />
              </Reveal>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
