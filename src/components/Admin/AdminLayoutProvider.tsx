import { createContext, PropsWithChildren, useContext, useState } from "react";
interface AdminLayoutContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (s: boolean) => void;
}

const AdminLayoutContext = createContext<AdminLayoutContextType>({
  sidebarOpen: true,
  setSidebarOpen: () => {},
});

export const useAdminLayout = () => useContext(AdminLayoutContext);

export default function AdminLayoutProvider({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <AdminLayoutContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </AdminLayoutContext.Provider>
  );
}
