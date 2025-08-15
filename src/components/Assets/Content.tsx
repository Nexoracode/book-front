import { PropsWithChildren } from "react";

export default function Content({ children }: PropsWithChildren) {
  return (
    <p
      style={{ marginBottom: "3rem" }}
      className="text-gray-700 block leading-8"
    >
      {children}
    </p>
  );
}
