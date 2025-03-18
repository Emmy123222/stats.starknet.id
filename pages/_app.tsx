import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FC } from "react";
import Head from "next/head";
import { Navbar } from "../components/layouts/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import createEmotionCache from "../src/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useRouter } from "next/router";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App: FC<MyAppProps> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) => {
  const queryClient = new QueryClient();
  const router = useRouter();

  const noNavbarRoutes = ['/analytics'];
  const showNavbar = !noNavbarRoutes.includes(router.pathname);

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Head>
          <title>Dashboard.Starknet.id</title>
        </Head>
        {showNavbar && <Navbar />}
        <Component className="relative" {...pageProps} />
      </QueryClientProvider>
    </CacheProvider>
  );
};

export default App;
