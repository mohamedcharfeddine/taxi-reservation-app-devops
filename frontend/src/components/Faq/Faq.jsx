import AccordionGrid from "./AccordionGrid";
import { useTranslation } from "next-i18next";

const Faq = () => {
  const { t } = useTranslation("common");
  return (
    <div id="faq-section" className="my-16">
      <div className="text-4xl font-bold text-center">{t("faqTitle")}</div>
      <div className="sm:mx-24 my-16 mx-2">
        <AccordionGrid />
      </div>
    </div>
  );
};

export default Faq;
