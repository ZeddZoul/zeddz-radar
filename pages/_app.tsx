import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ComponentType, ReactNode } from "react";

type AppPropsWithLayout = AppProps & {
  Component: AppProps["Component"] & {
    pageLayout?: ComponentType<{ children?: ReactNode }>;
  };
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  let comp = Component.pageLayout ? (
    <>
      {" "}
      <Component.pageLayout />
      <Component {...pageProps} />
    </>
  ) : (
    <Component {...pageProps} />
  );
  return comp;
 
}
export default App;
