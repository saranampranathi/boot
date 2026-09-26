// import React from 'react';
// import './Hero.css';
// import handIcon from '../Assets/hand-icon-.avif';
// import arrow_icon from '../Assets/arrow_icon.jpg';
// import hero_image from '../Assets/young-girl-dressed-up-black-t-shirt-leather-trousers-holding-blank-craft-shopping-bags-with-handles-isolated-white_231208-4952.avif';

// const Hero = () => {
//   return (
//     <div className='hero'>
//       {/* Text and Button Section */}
//       <div className="hero-left">
//         <h2>NEW ARRIVALS ONLY</h2>
//         <div className="hero-text-container">
//           <div className="hero-hand-icon">
//             <p>new</p>
//             <img src={handIcon} alt="hand icon" />
//           </div>
//           <p>collections</p>
//           <p>for everyone</p>
//         </div>
//         <div className="hero-latest-btn">
//           <div>Latest Collection</div>
//           <img src={arrow_icon} alt="arrow" />
//         </div>
//       </div>

//       {/* Hero Image Section */}
//       <div className="hero-right">
//         <img src={hero_image} alt="hero model" />
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React from "react";
import "./Hero.css";
import arrowIcon from "../Assets/arrow_icon.jpg";
import heroImage from "../Assets/young-girl-dressed-up-black-t-shirt-leather-trousers-holding-blank-craft-shopping-bags-with-handles-isolated-white_231208-4952.avif";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1 className="hero-title">New Collections</h1>

        <button className="hero-btn">
          Latest Collection
          <img src={arrowIcon} alt="arrow" />
        </button>
      </div>

      <div className="hero-right">
        <img src={heroImage} alt="model" />
      </div>
    </section>
  );
};

export default Hero;
