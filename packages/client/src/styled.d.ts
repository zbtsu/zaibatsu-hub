// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      error: string;
      success: string;
      text: string;
      background: string;
      border: string;
      alert: string;
      trafficLights: {
        max: string;
        min: string;
        close: string;
      };
    };
    colorTheme: "dark" | "light";
    shadow: string[];
    space: string[];
    borderRadius: number;
    fontSize: string[];
    letterSpacing: string[];
    transition: (...args: string[]) => string;
  }
}
