// app/components/home/HomeContent.tsx
"use client"

import AdsClient from "./AdsClient"
import ProductsClient from "./ProductsClient"
import ProgramsClient from "./ProgramsClient"
import ArticlesClient from "./ArticlesClient"

export default function HomeContent() {
  return (
    <>
      <AdsClient />
      <ProductsClient />
      <ProgramsClient />
      <ArticlesClient />
    </>
  )
}
