import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/Navbar";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import "../../i18n";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Head from "next/head";
function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);
  const { i18n, t } = useTranslation("common");

  useEffect(() => {
    setIsClient(true);

    if (localStorage.getItem("lang")) {
      i18n.changeLanguage(localStorage.getItem("lang"));
    } else {
      localStorage.setItem("lang", "fl");
      i18n.changeLanguage("fl");
    }
  }, []);
  if (!isClient) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>{t("hometitle")}</title>
        <meta name="description" content={t("homeDescription")} />
        <meta name="keywords" content={t("keyWords")} />
        <meta
          name="google-site-verification"
          content="KURL5o3v_M_KbmpJnJWg_wY9dZN7CxLd1zrLHmuekgs"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Navbar />

      <Component {...pageProps} />

      <Footer />
    </>
  );
}
export default appWithTranslation(App);
