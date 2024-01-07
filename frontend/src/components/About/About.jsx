import { SiGooglepodcasts } from "react-icons/si";
import Image from "next/image";
import Reveal from "@/utils/Reveal";
import { useTranslation } from "next-i18next";

const About = () => {
  const { t } = useTranslation("common");
  return (
    <>
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
        <section className="flex flex-col justify-center my-16">
          <div className="flex justify-center items-center gap-4">
            <SiGooglepodcasts size={32} />
            <span className="text-4xl font-bold">{t("aboutUsTitle")}</span>
          </div>
          <div className="flex justify-center items-center gap-28 mt-14 text-center flex-col xl:flex-row">
            <p className="xl:w-2/5 mx-12 xl:-ml-10 font-medium text-xl  text-secondary">
              {t("aboutUsDescribe")}
            </p>

            <div className="relative flex xl:h-[500px] xl:w-[500px] w-[250px] h-[250px] xl:rounded-3xl rounded-xl bg-primary/50 justify-end before:absolute">
              <Image
                loading="eager"
                className="z-10 xl:mr-6 -mt-5 mr-5 mb-5"
                src="/assets/aboutus.webp"
                width={500}
                height={500 * (16 / 9)}
                type="image"
                alt="taxi_call"
              />
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
};

export default About;
