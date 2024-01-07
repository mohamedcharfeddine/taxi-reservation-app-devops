import Service from "@/components/Services/Service";
import { useEffect, useState } from "react";
import { SiGooglepodcasts } from "react-icons/si";
import { getProducts } from "src/pages/api/appConfig";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
const Services = () => {
  const { t } = useTranslation("common");
  const { i18n } = useTranslation("common");

  const [products, setProducts] = useState([]);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProducts(i18n.language);
        setProducts(response.products);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    }
    fetchData();
  }, [i18n?.language]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="xl:mt-36 mt-36 flex flex-col gap-5"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center items-center gap-10"
      >
        <SiGooglepodcasts size={32} />
        <span className="text-2xl font-bold">{t("servicesTitle")}</span>
      </motion.div>

      <div className="flex flex-wrap justify-around items-center mt-20 gap-10">
        {products.map((product, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            key={index}
          >
            <Service
              button={true}
              services={false}
              imageUrl={`${API_BASE_URL}/uploads/${product.image}`}
              title={product.name}
              description={product.description}
              seeMoreUrl={product.seeMoreUrl}
              serviceId={product._id}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Services;
