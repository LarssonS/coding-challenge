import { ChangeEvent } from "react";

export interface ProductPriceFilterProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  label: string
}