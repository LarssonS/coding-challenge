import { GetServerSideProps, NextPage } from 'next'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'

import { ProductCategoryFilter } from '@/components/ProductCategoryFilter/ProductCategoryFilter'
import { ProductPriceFilter } from '@/components/ProductPriceFilter/ProductPriceFilter'
import { Button } from '@/components/Button/Button'
import { Product } from '@/types/Product'

interface Props {
  products: Product[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch('https://fakestoreapi.com/products')
  const products = await res.json()
  return { props: { products } }
}

const Home: NextPage<Props> = ({ products }) => {
  const [offset, setOffset] = useState<number>(8)
  const [category, setCategory] = useState<string>('')
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(0)

  function prevPage() {
    if (offset === 8) {
      return
    }

    setOffset((prevOffset) => prevOffset - 8)
  }

  function nextPage() {
    if(offset > products.length) {
      return
    }

    setOffset((prevOffset) => prevOffset + 8)
  }


  const filteredProducts = useMemo<Product[]>(() => {
    if (!products) return []

    if (!category && minPrice === 0 && maxPrice === 0) {
      return products.slice(offset - 8, offset)
    }

    return products.filter(product => {
      return category ? product.category == category : true
    }).filter(product => {
      return minPrice > 0 ? minPrice <= parseFloat(product.price) : true
    }).filter(product => {
      return maxPrice > 0 ? maxPrice >= parseFloat(product.price) : true
    }).slice(offset - 8, offset)

  }, [products, offset, category, minPrice, maxPrice])

  return (
    <main
      className="bg-white"
    >
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Product overview</h2>

        <div className='border-b-black border-b w-full flex flex-col gap-4 lg:flex-row'>
          <ProductPriceFilter
            onChange={e => setMinPrice(parseFloat(e.target.value))}
            label='Min price'
          />

          <ProductPriceFilter
            onChange={e => setMaxPrice(parseFloat(e.target.value))}
            label='Max price'
          />

          <ProductCategoryFilter
            onChange={e => setCategory(e.target.value)}
            value={category}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <Link className='group' href={`/product/${product.id}`} key={product.id}>
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                <img className='h-full w-full object-cover object-center group-hover:opacity-75' src={product.image} alt='product image' />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </Link>
          ))}
        </div>

        <div className="flex flex-row mx-auto mt-16 justify-center gap-2">
          <Button onClick={() => prevPage()}>Prev</Button>
          <Button onClick={() => nextPage()}>Next</Button>
        </div>
      </div>
    </main>
  )
}

export default Home