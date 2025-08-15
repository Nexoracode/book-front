import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminLayoutProvider from "./AdminLayoutProvider";
import ReportProvider from "../../pages/AdminDashboard/ReportProvider";

type Props = {};

export default function AdminLayout({}: Props) {
  return (
    <React.Fragment>
      <AdminLayoutProvider>
        <AdminNavbar />
        <AdminSidebar />
        <ReportProvider>
          <main className="flex-1 pt-20 px-5">
            <Outlet />
          </main>
        </ReportProvider>
      </AdminLayoutProvider>
    </React.Fragment>
  );
}
