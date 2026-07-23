import { useState } from "react";

import "./DealsShowcase.css";




export default function DealsShowcase(){



const [mouse,setMouse] = useState({

x:0,

y:0

});






function handleMouseMove(e){



const x =

(e.clientX / window.innerWidth - 0.5) * 20;




const y =

(e.clientY / window.innerHeight - 0.5) * 20;





setMouse({

x,

y

});



}







const products = [



{

icon:"📱",

title:"أجهزة إلكترونية",

discount:"خصم 70%"

},





{

icon:"👟",

title:"أزياء وأحذية",

discount:"خصم 50%"

},





{

icon:"👜",

title:"حقائب فاخرة",

discount:"خصم 60%"

},





{

icon:"🎁",

title:"عروض خاصة",

discount:"خصم 80%"

}



];










return (





<section

className="deals-section reveal"

onMouseMove={handleMouseMove}

>







<div className="gold-coins">



<span>🪙</span>

<span>🪙</span>

<span>🪙</span>

<span>🪙</span>

<span>🪙</span>



</div>









<div className="deals-content reveal">





<h2>


🔥 عروض CouponHub العالمية


</h2>






<p>


اكتشف أفضل المنتجات والعروض الحصرية


</p>





</div>









<div className="products-grid">







{

products.map((item,index)=>(







<div



className="product-card reveal"



key={index}



style={{



transform:

`

translate3d(

${mouse.x * (index + 1) / 3}px,

${mouse.y * (index + 1) / 3}px,

0

)

`

}}



>







<div className="product-glow"></div>







<div className="product-icon">


{item.icon}


</div>







<h3>


{item.title}


</h3>








<strong>


{item.discount}


</strong>








<button>


اكتشف العرض


</button>








</div>





))





}








</div>









</section>





);



}
