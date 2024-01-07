import Accordion from "./Accordion";
import Reveal from "@/utils/Reveal";
import { useTranslation } from "next-i18next";
const AccordionGrid = () => {
  const { t } = useTranslation("common");
  const accordionData = [
    {
      id: 1,
      title: `${t("faq1")}`,
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {t("faq1describe")}{" "}
          </p>
        </>
      ),
    },
    {
      id: 2,
      title: `${t("faq2")}`,
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {t("faq2describe")}
          </p>{" "}
        </>
      ),
    },
    {
      id: 3,
      title: `${t("faq3")}`,
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {t("faq3describe")}{" "}
          </p>
        </>
      ),
    },
    {
      id: 4,
      title: `${t("faq4")}`,
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {t("faq4describe")}
          </p>
        </>
      ),
    },
    {
      id: 5,
      title: `${t("faq5")}`,
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {t("faq5describe")}
          </p>
        </>
      ),
    },
    {
      id: 6,
      title: `${t("faq6")}`,

      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {t("faq6describe")}
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-x-4 gap-y-4">
      {accordionData.map((item) => (
        <Reveal
          key={item.id} // Make sure to use a unique key
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{
            duration: 1, // Adjust the duration as needed
          }}
        >
          <Accordion key={item.id} {...item} />
        </Reveal>
      ))}
    </div>
  );
};

export default AccordionGrid;
