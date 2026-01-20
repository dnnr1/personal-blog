import type { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
};

function Wrapper({ children }: WrapperProps) {
  return <div className="mx-[10%] lg:mx-[20%]">{children}</div>;
}

export default Wrapper;
