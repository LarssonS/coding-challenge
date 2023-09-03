import { ProductCategoryFilterProps } from "./ProductCategoryFilterProps"
import { FC, useEffect, useState } from "react"


export const ProductCategoryFilter: FC<ProductCategoryFilterProps> = ({ value, onChange }) => {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(c => setCategories(c))
  }, [])

  return (
    <select
      className="w-min"
      value={value}
      onChange={onChange}
    >
      <option value="">Category</option>
      {categories.map(item => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  )
}