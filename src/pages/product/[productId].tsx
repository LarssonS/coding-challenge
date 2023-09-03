import { GetServerSideProps, NextPage } from "next";
import { FC } from "react";

import { Product } from "@/types/Product";

interface ProductInfoCardProps {
  label: string
  value: string
}

const ProductInfoCard: FC<ProductInfoCardProps> = ({ label, value }) => (
  <div className="border-t border-gray-200 pt-4">
    <dt className="font-medium text-gray-900">{label}</dt>
    <dd className="mt-2 text-sm text-gray-500">{value}</dd>
  </div>
)

interface ImgProps {
  src: string
  alt: string
}

const Img: FC<ImgProps> = ({ src, alt }) => (
  <img
    className="rounded-lg bg-gray-100"
    src={src}
    alt={alt}
  />
)

interface Props {
  product: Product
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const res = await fetch(`https://fakestoreapi.com/products/${query.productId}`)
  const product = await res.json()
  return { props: { product } }
}

const ProductDetailPage: NextPage<Props> = ({ product }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Product description</h2>
          <p className="mt-4 text-gray-500">
            {product?.description}
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <ProductInfoCard label="Product title" value={product.title} />
            <ProductInfoCard label="Category" value={product.category} />
            <ProductInfoCard label="Price" value={`&#36;${product?.price}`} />
            <ProductInfoCard label="Rating" value={product.rating.rate} />
          </dl>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <Img src={product.image} alt="Awesome product" />
          <Img src={product.image} alt="Awesome product" />
          <Img src={product.image} alt="Awesome product" />
          <Img src={product.image} alt="Awesome product" />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage