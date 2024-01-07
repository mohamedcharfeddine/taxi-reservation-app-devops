import Service from "@/components/Services/Service";
import { SiGooglepodcasts } from "react-icons/si";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";

const Region = () => {
  const { t } = useTranslation("common");
  const servicesData = [
    {
      imageUrl: "/assets/bonheiden.webp",
      title: "Bonheiden",
      location: { lat: 51.022, lng: 4.548 },
    },
    {
      imageUrl: "/assets/hofstade.webp",
      title: "Hofstade",
      location: { lat: 50.99, lng: 4.492 },
    },
    {
      imageUrl: "/assets/peulis.webp",
      title: "Peulis",
      location: { lat: 51.039, lng: 4.588 },
    },
    {
      imageUrl: "/assets/keerbergen.webp",
      title: "Keerbergen",
      location: { lat: 51.002, lng: 4.669 },
    },
    {
      imageUrl: "/assets/kontich.webp",
      title: "Kontich",
      location: { lat: 51.129, lng: 4.474 },
    },
    {
      imageUrl: "/assets/zaventem.webp",
      title: "Zaventem",
      location: { lat: 51.012, lng: 4.448 },
    },
  ];

  const openGoogleMaps = (location) => {
    const { lat, lng } = location;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="xl:mt-20 mt-36 flex flex-col justify-center items-center sm:pt-12"
    >
      <div className="flex justify-center items-center gap-4">
        <SiGooglepodcasts size={32} />
        <span className="text-2xl font-bold">{t("regionTitle")}</span>
      </div>
      <p className="text-[#767676] text-center mt-12 px-0 sm:px-16">
        {t("regionDescribe")}
      </p>

      <div className="w-full flex flex-row flex-wrap">
        {servicesData.map((service, index) => (
          <motion.div
            onClick={() => openGoogleMaps(service.location)}
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="w-full md:w-1/2 lg:w-1/3 p-4 "
          >
            <Service
              services={false}
              imageUrl={service.imageUrl}
              title={service.title}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Region;
