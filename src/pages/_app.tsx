import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { Navbar } from "~/components/Navbar";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Navbar />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
