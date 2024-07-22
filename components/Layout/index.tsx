import { ReactNode } from "react";

import classNames from "classnames/bind";

import Header from "@/components/Header";
import SideBar from "@/pages/dashboard/components/SideBar";

import styles from "./Layout.module.scss";

const cn = classNames.bind(styles);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className={cn("container")}>
        <div className={cn("wrap")}>
          <SideBar />
          {children}
        </div>
      </main>
    </>
  );
}
