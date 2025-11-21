import { createContext } from "react";
import type { AuthContextType } from "@appTypes/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default AuthContext;
