import { ProductPriceFilterProps } from './ProductPriceFilterProps'
import { FC } from 'react'

export const ProductPriceFilter: FC<ProductPriceFilterProps> = ({ label, onChange }) => {
  return (
    <label>
      {label}
      <input pattern="[0-9]*" inputMode="numeric" type="number" onChange={onChange} />
    </label>
  )
}
