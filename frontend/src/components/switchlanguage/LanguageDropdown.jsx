import { useTranslation } from "next-i18next";
import { appWithTranslation } from "next-i18next";
import Image from "next/image";
const LanguageDropdown = () => {
  const { i18n } = useTranslation("common");

  const languageOptions = [
    {
      value: "fl",
      label: "FL",
    },
    {
      value: "en",
      label: "EN",
    },
    {
      value: "fr",
      label: "FR",
    },
  ];
  const FlagImage = ({ lan }) => {
    switch (lan) {
      case "fl":
        return (
          <div id="fl-flag" className=" flex justify-center">
            <Image
              loading="eager"
              src="/assets/fl.webp"
              alt="fl"
              width={16}
              height={10}
            />
          </div>
        );
      case "en":
        return (
          <div id="en-flag" className=" flex justify-center">
            <Image
              loading="eager"
              src="/assets/en.webp"
              alt="en"
              width={16}
              height={10}
            />
          </div>
        );
      case "fr":
        return (
          <div className="aspect-ratio-box">
            <div className="aspect-ratio-box-content">
              <div id="fr-flag" className=" flex justify-center">
                <Image
                  loading="eager"
                  src="/assets/fr.webp"
                  alt="fr"
                  width={16}
                  height={10}
                />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div id="fl-flag" className=" flex justify-center">
            <Image
              loading="eager"
              src="/assets/fl.webp"
              alt="fl"
              width={16}
              height={10}
            />
          </div>
        );
    }
  };
  let lan = i18n.language;

  const handleChange = (e) => {
    const { value } = e.target;
    localStorage.setItem("lang", value);
    i18n.changeLanguage(value);
  };

  return (
    <div
      style={{
        marginTop: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <select
        style={{ width: "80px", border: "1px solid gray" }}
        aria-label="lang"
        value={lan}
        onChange={handleChange}
        className="language-select"
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FlagImage lan={lan} />
    </div>
  );
};

export default appWithTranslation(LanguageDropdown);
