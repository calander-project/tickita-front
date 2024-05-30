import { useState } from "react";

import type { AppProps } from "next/app";

import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/styles/reset.scss";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1 * 60 * 1000, // 1분
            gcTime: 5 * 60 * 1000, // 5분
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
