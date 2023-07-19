import { useIntl } from "react-intl";
import { Locale, localeLocalStorageKey } from "./App";
import { addToLocalStorage } from "./utils/utils";

interface LanguageSelectorProps {
  locale: Locale;
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
}

export const LanguageSelector = ({
  locale,
  setLocale,
}: LanguageSelectorProps) => {
  const intl = useIntl();

  return (
    <>
      <label htmlFor="LanguageSelector" style={{ marginRight: "5px" }}>
        {intl.formatMessage({ id: "language" })}
      </label>
      <select
        id="LanguageSelector"
        onChange={(e) => {
          setLocale(e.target.value as Locale);
          addToLocalStorage(localeLocalStorageKey, e.target.value);
        }}
      >
        <option value={Locale.EN} selected={locale === Locale.EN}>
          English
        </option>
        <option value={Locale.ES} selected={locale === Locale.ES}>
          Español
        </option>
      </select>
    </>
  );
};
