import { ToastType } from "@/types/type";

type ToastObserver = (array: ToastArrayType) => void;

export interface ToastArrayType {
  type: ToastType;
  message: string;
}

export class ToastService {
  private static instance: ToastService; // 싱크톤 패턴 정의(클래스의 인스턴스는 하나만 존재)

  private observers: ToastObserver[] = []; // 옵저버 목록
  private updaters: ToastObserver[] = []; // 업데이터 목록

  private messages: ToastArrayType[] = []; // 알림 메시지 목록

  private constructor() {}

  public static getInstance(): ToastService {
    if (!ToastService.instance) {
      // 새로운 인스턴스 생성
      ToastService.instance = new ToastService();
    }
    return ToastService.instance; // 기존 인스턴스 반환
  }

  subscribe(observer: ToastObserver, updater: ToastObserver) {
    // 새로운 옵저버(메세지를 받을 대상) 추가
    this.observers.push(observer);
    this.updaters.push(updater);
  }

  unsubscribe(observer: ToastObserver, updater: ToastObserver) {
    // 기존 옵저버 제거
    this.observers = this.observers.filter((prev) => prev !== observer);
    this.updaters = this.updaters.filter((prev) => prev !== updater);
  }

  notifyObserver() {
    // 모든 옵저버에게 가장 최근 메세지 전달
    this.observers.forEach((observer) => observer(this.messages[this.messages.length - 1]));
  }

  notifyUpdater() {
    // 모든 옵저버에게 가장 최근 메세지 전달
    this.updaters.forEach((test) => test(this.messages[this.messages.length - 1]));
  }

  addToast(type: ToastType, message: string) {
    // 메세지 추가
    this.messages.push({ type, message });
    this.notifyObserver();
  }

  updateToastType(type: ToastType, message: string) {
    // 메세지 업데이트
    this.messages[this.messages.length - 1] = { type, message };
    this.notifyUpdater();
  }
}
