import type { ReactNode } from "react";

export default function Sidepane({ children } : {children: ReactNode}) {
  return <div className="bg-zinc-50/20 w-1/3 p-6">{children}</div>;
}
