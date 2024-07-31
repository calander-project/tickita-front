import React, { useState, useEffect, useRef } from "react";

import classNames from "classnames/bind";

import { ToastArrayType, ToastService } from "@/services/toastService";

import { ToastType } from "@/types/type";

import styles from "./Toast.module.scss";
import ToastMessage from "./ToastMessage";

const cn = classNames.bind(styles);

export interface IndividualToastType {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastProps {
  limit?: number; // 토스트 개수, 기본 값 3
  autoClose?: number; // 자동으로 토스트가 제거되는 시간, 기본 값 3000ms
}

function Toast({ limit = 3, autoClose = 3000 }: ToastProps) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [messages, setMessages] = useState<IndividualToastType[]>([]);
  const id = useRef(0);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (messages.length > limit) {
      return;
    }

    const handleNewMessage = ({ type, message }: ToastArrayType) => {
      setMessages((prev) => [...prev, { id: id.current++, type, message }]);

      if (type === "pending") {
        return;
      }

      // 메시지를 일정 시간 후에 제거
      setTimeout(() => {
        setMessages((prev) => prev.slice(1));
      }, autoClose);
    };

    const handleLatestMessageChange = ({ type, message }: ToastArrayType) => {
      setMessages((prev) => {
        const latestMessage = prev[prev.length - 1];

        if (latestMessage) {
          latestMessage.type = type;
          latestMessage.message = message;
        }

        return [...prev];
      });

      if (type === "pending") {
        return;
      }

      setTimeout(() => {
        setMessages((prev) => prev.slice(1));
      }, autoClose);
    };

    const toastService = ToastService.getInstance();

    toastService.subscribe(handleNewMessage, handleLatestMessageChange);

    return () => {
      toastService.unsubscribe(handleNewMessage, handleLatestMessageChange);
    };
  }, [messages.length]);

  const handleDeleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  return (
    <div className={cn("toast-box")}>
      {messages.map((toast) => (
        <ToastMessage
          message={toast.message}
          autoClose={autoClose}
          type={toast.type}
          key={toast.id}
          onClose={() => handleDeleteMessage(toast.id)}
        />
      ))}
    </div>
  );
}

export default React.memo(Toast);
