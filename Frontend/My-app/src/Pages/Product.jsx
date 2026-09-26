// import React, { useContext } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import { useParams } from 'react-router-dom'
// import Breadcrum from '../Components/Breadcrums/Breadcrum'
// import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
// import Descriptionbox from '../Components/Descriptionbox/Descriptionbox'
// import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
// import { DataContext } from '../Context/DataContext'
// const Product = () => {
//   const { all_products } = useContext(ShopContext)
//    const { data } = useContext(DataContext)
//   const { productid } = useParams()
//   const product =
//     all_products.find((e) => e.id === Number(productid)) ||
//     data.find((e) => e.id === Number(productid))


//   return (
//     <div>
//       <Breadcrum product={product} />
//       <ProductDisplay product={product} />
//       <Descriptionbox />

//       <RelatedProducts product={data}/>
//     </div>
//   )
// }

// export default Product




import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { DataContext } from '../Context/DataContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import ProductDisplay2 from '../Components/ProductDisplay/ProductDisplay2'
import Descriptionbox from '../Components/Descriptionbox/Descriptionbox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Product = () => {
  const { all_products } = useContext(ShopContext)
  const { data } = useContext(DataContext)
  const { productid } = useParams()

  const productFromAll = all_products.find(
    (e) => e.id === Number(productid)
  )

  const productFromData = data.find(
    (e) => e.id === Number(productid)
  )

  const product = productFromAll || productFromData
  const isDataProduct = !!productFromData

  if (!product) return null

  return (
    <div>
      <Breadcrum product={product} />
      {isDataProduct
        ? <ProductDisplay2 product={product} />
        : <ProductDisplay product={product} />
      }
      <Descriptionbox />
      <RelatedProducts data={data} />
    </div>
  )
}

export default Product