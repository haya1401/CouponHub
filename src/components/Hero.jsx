import { useState } from "react";

import "./Hero.css";


import {
  coin,
  coupon,
  gift,
  shoppingBag
} from "../assets/heroAssets";


import HeroEffects from "./HeroEffects";




export default function Hero() {



const [mouse,setMouse] = useState({

x:0,

y:0

});





function handleMouseMove(e){


const x =

(e.clientX / window.innerWidth - 0.5) * 30;




const y =

(e.clientY / window.innerHeight - 0.5) * 30;



setMouse({

x,

y

});


}





function scrollToCoupons(){


const section =

document.getElementById(
"featured-coupons"
);




if(section){


section.scrollIntoView({

behavior:"smooth"

});


}


}







return (



<section

className="hero reveal"

onMouseMove={handleMouseMove}

>




{/* العملات المتساقطة */}

<HeroEffects />





<div className="hero-overlay"></div>



<div className="hero-light hero-light-1"></div>

<div className="hero-light hero-light-2"></div>








{/* الصور الثلاثية الأبعاد */}





<img

src={coin}

className="floating coin"

alt="gold coin"

loading="lazy"

style={{

transform:

`translate(${mouse.x}px,${mouse.y}px)`

}}

/>







<img

src={coupon}

className="floating coupon"

alt="coupon"

loading="lazy"

style={{

transform:

`translate(${mouse.x * -1}px,${mouse.y}px)`

}}

/>








<img

src={gift}

className="floating gift"

alt="gift"

loading="lazy"

style={{

transform:

`translate(${mouse.x / 2}px,${mouse.y / 2}px)`

}}

/>








<img

src={shoppingBag}

className="floating bag"

alt="shopping bag"

loading="lazy"

style={{

transform:

`translate(${mouse.x * -0.5}px,${mouse.y * -0.5}px)`

}}

/>









<div className="floating sale">

70%

</div>









<div className="hero-content">







<span className="hero-badge">


🔥 أكثر من 10000 كوبون خصم


</span>









<h1>

وفر أكثر مع أفضل

<br/>

كوبونات الخصم والعروض

</h1>









<p>

اكتشف أحدث أكواد الخصم والعروض

الحصرية من أشهر المتاجر

العالمية.

</p>









<button

className="hero-btn"

onClick={scrollToCoupons}

>


🚀 استعرض أفضل الكوبونات


</button>









<div className="hero-stats">








<div>

<h2>

500+

</h2>


<span>

متجر

</span>

</div>







<div>

<h2>

10000+

</h2>


<span>

كوبون

</span>

</div>







<div>

<h2>

24/7

</h2>


<span>

تحديث يومي

</span>

</div>







</div>







</div>







</section>



);


}
