import Router from "next/router";
import { GetServerSidePropsContext } from "next/types";

import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { PAGE_PATH } from "@/constants/pagePath";
import getCookieValue from "@/utils/getCookieValue";
import { getIsBrowser, getIsServer } from "@/utils/getIsEnvironment";

let context: GetServerSidePropsContext | null = null;
export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

const getBaseURL = () => {
  if (getIsBrowser()) {
    return window.location.origin;
  }

  if (getIsServer() && context) {
    const { req } = context;

    const protocol = req.headers["x-forwarded-proto"];
    const host = req.headers.host;

    if (protocol && host) {
      return `${protocol}://${host}`;
    }
  }

  return "http://localhost:3000";
};

export const nextInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

export const basicInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const imageRequestInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

instance.interceptors.request.use(async (config) => {
  try {
    if (getIsServer() && context) {
      nextInstance.defaults.headers.cookie = context.req.headers.cookie!;
    }

    const res = await nextInstance.get("/api/cookies");

    const { ACCESS_TOKEN } = res.data;

    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return Promise.reject(error);
    }
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // refresh token 가져오기
        let REFRESH_TOKEN = "";

        if (getIsServer() && context) {
          const refreshTokenString = context.req.headers.cookie;

          if (!refreshTokenString) {
            throw new Error("refresh token이 존재하지 않습니다"); // refresh token 없으면 로그인 페이지로 이동
          }

          REFRESH_TOKEN = getCookieValue(refreshTokenString, "REFRESH_TOKEN");
        }

        if (getIsBrowser()) {
          const tokens = await nextInstance.get("/api/cookies");
          REFRESH_TOKEN = tokens.data.REFRESH_TOKEN;
        }

        // access token 재발급
        const refreshResponse = await instance.post("/token/refresh", { refresh: REFRESH_TOKEN });
        const { accessToken, refreshToken, refreshTokenExpireAt } = refreshResponse.data;

        // cookie에 새로 발급받은 token 저장
        await nextInstance.post("/api/setCookies", {
          accessToken,
          refreshToken,
          refreshTokenExpireAt,
        });

        // Authorization header에 새로 발급받은 access token 설정
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        // 기존 요청 재시도
        return axios(originalRequest);
      } catch (refreshError) {
        Router.push(PAGE_PATH.SIGN_IN);

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
