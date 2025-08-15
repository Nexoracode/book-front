import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Filter } from "../../types";

interface ReportContextType {
  filters: Filter;
  setFilters: (filters: Filter) => void;
}
const ReportContext = createContext<ReportContextType>({
  filters: {},
  setFilters: () => {},
});

export const useReport = () => useContext(ReportContext);

export default function ReportProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState<Filter>({});
  return (
    <ReportContext.Provider value={{ filters, setFilters }}>
      {children}
    </ReportContext.Provider>
  );
}
