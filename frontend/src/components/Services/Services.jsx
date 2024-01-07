import { useEffect, useState } from "react";
import Service from "./Service";
import { SiGooglepodcasts } from "react-icons/si";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getProducts } from "src/pages/api/appConfig";
import Reveal from "@/utils/Reveal";
import { useTranslation } from "next-i18next";

const Services = () => {
  const { t } = useTranslation("common");
  const staticServices = [
    {
      serviceTitle: `${t("staticService1")}`,
      serviceContent: `${t("staticService1Content")}`,
      serviceImage: "/assets/taxiservice.webp",
    },
    {
      serviceTitle: `${t("staticService2")}`,
      serviceContent: `${t("staticService2Content")}`,
      serviceImage: "/assets/client.webp",
    },
    {
      serviceTitle: `${t("staticService3")}`,
      serviceContent: `${t("staticService3Content")}`,
      serviceImage: "/assets/person-2.webp",
    },
    {
      serviceTitle: `${t("staticService4")}`,
      serviceContent: `${t("staticService4Content")}`,
      serviceImage: "/assets/person-3.webp",
    },
    {
      serviceTitle: `${t("staticService5")}`,
      serviceContent: `${t("staticService5Content")}`,
      serviceImage: "/assets/uber.webp",
    },
    {
      serviceTitle: `${t("staticService6")}`,
      serviceContent: `${t("staticService6Content")}`,
      serviceImage: "/assets/hospital.webp",
    },
  ];

  const [products, setProducts] = useState([]);
  const { i18n } = useTranslation("common");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  let currentTaskId = null;
  let abortControllers = {};

  useEffect(() => {
    const worker = new Worker("/dataFetcherWorker.js");

    worker.onmessage = (event) => {
      if (event.data.success) {
        setProducts(event.data.data.products);
      } else {
        console.error(
          "Erreur lors de la récupération des produits:",
          event.data.error
        );
      }
      worker.terminate();
    };

    if (currentTaskId !== null) {
      worker.postMessage({ type: "abort", taskId: currentTaskId });
      abortControllers[currentTaskId].abort();
    }

    currentTaskId = Date.now();
    const controller = new AbortController();
    abortControllers[currentTaskId] = controller;

    const apiUrl = `${API_BASE_URL}/api/products/services?lang=${i18n?.language}`;
    worker.postMessage({
      type: "fetch",
      taskId: currentTaskId,
      url: apiUrl,
    });

    return () => {
      controller.abort();
      worker.terminate();
    };
  }, [i18n?.language]);

  return (
    <>
      <Reveal
        variants={{
          hidden: { opacity: 0, x: -170 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <section className="flex flex-col justify-center my-20 md:h-[800px]">
          <div className="flex justify-center items-center gap-4 my-16">
            <SiGooglepodcasts size={32} />
            <span className="text-4xl font-bold">{t("servicesTitle")}</span>
          </div>
          {products.length > 0 ? (
            <Swiper
              className="w-full flex flex-row justify-center items-center"
              loop={true}
              breakpoints={{
                1024: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 1,
                },
                320: {
                  slidesPerView: 1,
                },
              }}
              pagination={{ clickable: false }}
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <Reveal
                    variants={{
                      hidden: {
                        opacity: 0,
                        x:
                          (index + 1) % 3 === 0
                            ? 70
                            : (index + 1) % 2 !== 0
                            ? -70
                            : 0,
                        scale: index === 1 ? 0.5 : 1,
                      },
                      visible: { opacity: 1, x: 0, scale: 1 },
                    }}
                    transition={{
                      duration: 1,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                    key={index}
                  >
                    <Service
                      button={true}
                      services={true}
                      imageUrl={`${API_BASE_URL}/uploads/${product.image}`}
                      title={product.name}
                      description={
                        product.description
                          ? product.description.length > 70
                            ? product.description.slice(0, 70) + "..."
                            : product.description
                          : ""
                      }
                      serviceId={product._id}
                    />
                  </Reveal>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Swiper
              className="w-full flex flex-row justify-center items-center"
              loop={true}
              breakpoints={{
                1024: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 1,
                },
                320: {
                  slidesPerView: 1,
                },
              }}
              pagination={{ clickable: false }}
            >
              {staticServices.map((product, index) => (
                <SwiperSlide key={index}>
                  <Reveal
                    variants={{
                      hidden: {
                        opacity: 0,
                        x:
                          (index + 1) % 3 === 0
                            ? 70
                            : (index + 1) % 2 !== 0
                            ? -70
                            : 0,
                        scale: index === 1 ? 0.5 : 1,
                      },
                      visible: { opacity: 1, x: 0, scale: 1 },
                    }}
                    transition={{
                      duration: 1,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                    key={index}
                  >
                    <Service
                      btnStatic={true}
                      services={true}
                      imageUrl={product.serviceImage}
                      title={product.serviceTitle}
                      description={product.serviceContent}
                      serviceId={product._id}
                    />
                  </Reveal>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </section>
      </Reveal>
    </>
  );
};

export default Services;
