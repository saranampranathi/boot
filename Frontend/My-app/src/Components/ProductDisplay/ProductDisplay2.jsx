import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/staricon.jpg'
import star_dull_icon from '../Assets/dullstaricon.jpg'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay2 = (props) => {
  const { product } = props
  const { addToCart } = useContext(ShopContext)

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img
            className='productdisplay-main-img'
            src={product?.image}
            alt={product?.name || "product"}
          />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product?.name}</h1>

        <div className="productdisplay-right-star">
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_dull_icon} alt="star" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-rightprices">
          <div className="productdisplay-rightpriceold">$ old_price {product?.old_price}</div>
          <div className="productdisplay-rightpricenew">$ new_price {product?.new_price}</div>
        </div>

        <div className="productdisplay-rightdescription">
          <p>{product?.description}</p>
        </div>

        <div className="productdisplay-rightsize">
          <h1>Select size</h1>
          <div className="productdisplay-rightsize">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>

        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>

        <p className='productdisplay-rightcategory'>
          <span>Category :</span> {product?.type}
        </p>
        <p className='productdisplay-rightcategory'>
          <span>Tags :</span> {(product?.tags || []).join(" , ")}
        </p>
      </div>
    </div>
  )
}

export default ProductDisplay2












































































































































































































































































// import React from 'react';
// import './ProductDisplay.css';
// import star_icon from '../Assets/staricon.jpg';
// import star_dull_icon from '../Assets/dullstaricon.jpg';
// import { ShopContext } from '../../Context/ShopContext'





// const ProductDisplay2 = (props) => {
//     const { product } = props;
//      const {addToCart}=useContext(ShopContext)
//   return (
//     <div className='productdisplay'>
//       <div className="productdisplay-left">
//         {/* <div className="productdisplay-img-list">
//           <img src={product?.image} alt={product?.name || "product"} />
//           <img src={product?.image} alt={product?.name || "product"} />
//           <img src={product?.image} alt={product?.name || "product"} />
//           <img src={product?.image} alt={product?.name || "product"} />
//         </div> */}

//         <div className="productdisplay-img">
//           <img
//             className='productdisplay-main-img'
//             src={product?.image}
//             alt={product?.name || "product"}
//           />
//         </div>
//       </div>

//       <div className="productdisplay-right">
//         <h1>{product?.name}</h1>

//         <div className="productdisplay-right-star">
//           <img src={star_icon} alt="star" />
//           <img src={star_icon} alt="star" />
//           <img src={star_icon} alt="star" />
//           <img src={star_icon} alt="star" />
//           <img src={star_dull_icon} alt="star" />
//           <p>(122)</p>
//         </div>
//         <div className="productdisplay-rightprices">
//             <div className="productdisplay-rightpriceold">$ old_price {product.old_price}

//             </div>
//             <div className="productdisplay-rightpricenew">$ new_price {product.new_price}</div>
//         </div>

//         <div className="productdisplay-rightdescription">
//             <p>{product.description}</p>
//         </div>
//         <div className="productdisplay-rightsize">
//             <h1>Select size</h1>
//             <div className="productdisplay-rightsize">
//                 <div>S</div>
//                 <div>M</div>
//                 <div>L</div>
//                 <div>XL</div>
//                 <div>XXL</div>
//             </div>
//         </div>
//         <button onClick={()=>{addToCart(product.id)}} >ADD TO CART</button>
//         <p className='productdisplay-rightcategory'>
//             <span>Category :</span> {product.type}
//         </p>
//          <p className='productdisplay-rightcategory'>
//             <span>Tags :</span> {product.tags.join(" , ")}
//         </p>
//          {/* <p className='productdisplay-rightcategory'>
//             <span>Category :</span> Women T-shirt ,crop top
//         </p> */}






//       </div>
//     </div>
//   );
// };

// export default ProductDisplay2