import { useEffect, useState } from "react";
import "./App.css";
import { Dropdown } from "./Dropdown";
import { IntlProvider } from "react-intl";
import englishMessages from "./locales/en.json";
import spanishMessages from "./locales/es.json";
import { Header } from "./Header";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { LanguageSelector } from "./LanguageSelector";

export enum Locale {
  EN = "en",
  ES = "es",
}

const messages = {
  [Locale.EN]: englishMessages,
  [Locale.ES]: spanishMessages,
};

const FAQMenuItems = [
  { href: "#", id: "menu.item1" },
  { href: "#", id: "menu.item2" },
  { href: "#", id: "menu.item3" },
];

function App() {
  const [locale, setLocale] = useState<Locale>(Locale.EN);

  useEffect(() => console.log(locale), [locale]);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <HelmetProvider>
        <Helmet>
          <html lang={locale} />
        </Helmet>
        <LanguageSelector setLocale={setLocale} />
        <Header />
        <nav aria-label="Main navigation">
          <Dropdown menuItems={FAQMenuItems} />
        </nav>
      </HelmetProvider>
    </IntlProvider>
  );
}

export default App;
