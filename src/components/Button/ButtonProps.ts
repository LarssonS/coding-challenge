import { MouseEvent, PropsWithChildren } from "react";

export interface ButtonProps extends PropsWithChildren {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}