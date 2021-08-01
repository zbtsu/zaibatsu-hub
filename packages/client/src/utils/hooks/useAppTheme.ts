import { useMediaMatch } from "rooks";
import { useAppSelector } from "../../global/hooks";

const useAppTheme = () => {
  const darkTheme = useMediaMatch("(prefers-color-scheme: dark)");
  const appTheme = useAppSelector((state) => state.settings.theme);
  if (appTheme === "system") {
    return darkTheme ? "dark" : "light";
  }
  return appTheme;
};

export default useAppTheme;
