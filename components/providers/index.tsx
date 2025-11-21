import { SafeAreaProvider } from "react-native-safe-area-context";
import QueryProvider from "./QueryProvider";
import AuthProvider from "./AuthProvider";
import { ToastContainer } from "@components/common/CustomToast";
import { ReactNode } from "react";
import ThemeProvider from "./ThemeProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </QueryProvider>
      <ToastContainer />
    </SafeAreaProvider>
  );
}
