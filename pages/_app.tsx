import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ComponentType, ReactNode } from "react";
import { useRouter } from "next/router";
type AppPropsWithLayout = AppProps & {
  Component: AppProps["Component"] & {
    pageLayout?: ComponentType<{ children?: ReactNode }>;
  };
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()
  let comp = Component.pageLayout ? (
    <>
      {" "}
      <Component.pageLayout />
      <Component key={router.asPath} {...pageProps} />
    </>
  ) : (
    <Component {...pageProps} />
  );
  return comp;
 
}
export default App;



