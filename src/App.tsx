import { useEffect, useState } from "react";
import "./App.css";
import { Dropdown } from "./Dropdown";
import { IntlProvider } from "react-intl";
import englishMessages from "./locales/en.json";
import spanishMessages from "./locales/es.json";
import { Header } from "./Header";
import { Helmet } from "react-helmet";

enum Locale {
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
      <Helmet>
        <html lang={locale} />
      </Helmet>
      <Header />
      <nav aria-label="Main navigation">
        <select onChange={(e) => setLocale(e.target.value as Locale)}>
          <option value={Locale.EN}>English</option>
          <option value={Locale.ES}>Español</option>
        </select>
        <Dropdown menuItems={FAQMenuItems} />
      </nav>
    </IntlProvider>
  );
}

export default App;
