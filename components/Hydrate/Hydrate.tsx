import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import QueryProvider from "../QueryProvider";
import { ReactNode } from "react";

export default function Hydrate({
  state,
  children,
}: {
  state: DehydratedState;
  children: ReactNode;
}) {
  return (
    <QueryProvider>
      <HydrationBoundary state={state}>{children}</HydrationBoundary>
    </QueryProvider>
  );
}
