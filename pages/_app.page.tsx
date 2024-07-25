import "@/styles/reset.css";
import { NextPage } from "next";
import { ReactElement, ReactNode, useState } from "react";

import type { AppProps } from "next/app";

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "@/components/ErrorFallBack";
import Portal from "@/components/Modal/Portal";
import Toast from "@/components/Toast";

// 페이지 컴포넌트에 레이아웃을 추가할 수 있도록 확장한 타입
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout; // componets 속성이 NextPageWithLayout 타입을 따르도록 변경
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0, // 재시도 횟수
            staleTime: 1 * 60 * 1000, // 1분
            gcTime: 5 * 60 * 1000, // 5분
            throwOnError: true, // 에러 발생 시 컴포넌트에 에러를 전파
          },
        },
      }),
  );

  // 컴포넌트에 getLayout 함수가 정의되어 있으면 해당 함수를 호출하고, 그렇지 않으면 페이지 컴포넌트를 그대로 반환
  const getLayout = Component.getLayout ?? ((page) => page);

  const { reset } = useQueryErrorResetBoundary();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
          {getLayout(<Component {...pageProps} />)}
          <Portal />
          <Toast limit={3} autoClose={3000} />
        </ErrorBoundary>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
