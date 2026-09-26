import React from 'react'
import './Descriptionbox.css'


const Descriptionbox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionboxnavbox">
          Description
        </div>
          <div className="descriptionboxnavboxfade">
          Reviews (122)
        </div>

      </div>
      <div className="descriptionbox-des">
        <p>Text</p>
        <p>Text2</p>
      </div>
    </div>
  ) 
}

export default Descriptionbox