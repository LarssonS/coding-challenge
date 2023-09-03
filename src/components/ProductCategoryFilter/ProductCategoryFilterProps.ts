import { ChangeEvent } from "react"

export interface ProductCategoryFilterProps {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  value: string,
}