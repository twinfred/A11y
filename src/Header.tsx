import { useIntl } from "react-intl";

export const Header = () => {
  const intl = useIntl();

  return <h1>{intl.formatMessage({ id: "header1" })}</h1>;
};
