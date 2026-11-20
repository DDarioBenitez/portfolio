import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteShell({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="site-canvas" aria-hidden="true" />
      <a href="#main" className="skip-link">
        {t("common.skip")}
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
