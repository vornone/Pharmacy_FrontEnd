import React, { useEffect } from 'react'
import useProduct from '../../hooks/useProduct'
import ProductGrid from '../ProductGrid'
function TestProductAPI() {
  const { data, loading, error, getProduct } = useProduct()
  useEffect(() => {
    getProduct()
  }, [])
  return (
    <>
      {error || data === undefined ? (
        <h1>{error}</h1>
      ) : loading ? (
        <h1>Loading...</h1>
      ) : (
        <ProductGrid data={data} />
      )}
    </>
  )
}

export default TestProductAPI
