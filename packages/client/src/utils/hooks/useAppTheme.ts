import { useMediaMatch } from "rooks";
import { useAppSelector } from "../../global/hooks";
import { useVibrancyService } from "../../services/useVibrancyService";

const useAppTheme = () => {
  const darkTheme = useMediaMatch("(prefers-color-scheme: dark)");
  const appTheme = useAppSelector((state) => state.settings.theme);
  useVibrancyService(
    appTheme === "system" ? (darkTheme ? "dark" : "light") : appTheme
  );
  if (appTheme === "system") {
    return darkTheme ? "dark" : "light";
  }
  return appTheme;
};

export default useAppTheme;
