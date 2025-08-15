import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function usePopup() {
  var [open, setOpen] = useState(false);
  var wrapperRef = useRef<any>(null);
  var { pathname } = useLocation();
  useEffect(() => {
    var handleClick = (e: any) => {
      if (wrapperRef.current?.contains(e.target)) return;

      setOpen(false);
    };
    document?.addEventListener("click", handleClick);

    return () => document?.removeEventListener("click", handleClick);
  }, [wrapperRef.current]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return {
    open,
    setOpen,
    wrapperRef,
  };
}
