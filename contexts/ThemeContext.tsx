import { ThemeContextType } from "@appTypes/theme";
import { createContext } from "react";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export default ThemeContext;
