import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SiGooglepodcasts } from "react-icons/si";
import { getOneProduct } from "../api/appConfig";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const ServiceDetails = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { i18n } = useTranslation("common");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await getOneProduct(productId, i18n.language);
        setProduct(productData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du produit :",
          error
        );
      }
    }
    fetchProduct();
  }, [productId, i18n?.language]);

  if (!product) {
    return <div>Chargement en cours...</div>;
  }
  const imageUrl = `${API_BASE_URL}/uploads/${product.image}`;

  return (
    <section className="flex flex-col justify-center my-24 ">
      <div className="flex justify-center items-center gap-4">
        <SiGooglepodcasts size={32} />
        <span className="text-2xl font-bold">{product.name}</span>
      </div>
      <div className="flex justify-center items-center gap-28 text-justify mt-14 flex-col xl:flex-row">
        <p className="xl:w-2/5 mx-12 xl:-ml-10 font-medium text-[20px]/loose text-secondary">
          {product.description}
        </p>

        <div className="relative flex xl:h-[500px] xl:w-[500px] w-[250px] h-[250px] xl:rounded-3xl rounded-xl bg-primary/50 justify-end before:absolute">
          <Image
            loading="eager"
            className="z-10 xl:mr-6 -mt-5 mr-5 mb-5 "
            src={imageUrl}
            width={500}
            height={500}
            type="image"
            alt={product.name}
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
