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
    };
    space: string[];
    borderRadius: number;
    fontSize: string[];
  }
}
