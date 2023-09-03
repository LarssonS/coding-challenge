type Rating = {
  rate: string
  count: string
}

export interface Product {
  id: number
  title: string
  price: string
  category: string
  description: string
  image: string
  rating: Rating
}
