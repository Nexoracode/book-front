import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

type Props = {};

export default function UserLayout({}: Props) {
  return (
    <React.Fragment>
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
}
