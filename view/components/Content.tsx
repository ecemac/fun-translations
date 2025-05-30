import type { ReactNode } from "react";

export default function Content({ children } : {children: ReactNode}) {
  return (
    <div className="bg-zinc-50 w-full p-6 border border-zinc-100 w-full h-full rounded-lg">
      {children}
    </div>
  );
}
