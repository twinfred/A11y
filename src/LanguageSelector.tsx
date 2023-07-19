import { useIntl } from "react-intl";
import { Locale } from "./App";

interface LanguageSelectorProps {
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
}

export const LanguageSelector = ({ setLocale }: LanguageSelectorProps) => {
  const intl = useIntl();

  return (
    <>
      <label htmlFor="LanguageSelector" style={{ marginRight: "5px" }}>
        {intl.formatMessage({ id: "language" })}
      </label>
      <select
        id="LanguageSelector"
        onChange={(e) => setLocale(e.target.value as Locale)}
      >
        <option value={Locale.EN}>English</option>
        <option value={Locale.ES}>Español</option>
      </select>
    </>
  );
};
