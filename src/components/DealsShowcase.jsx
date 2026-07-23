import "./DealsShowcase.css";


export default function DealsShowcase(){


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


<section className="deals-section">


<div className="gold-coins">


<span>🪙</span>
<span>🪙</span>
<span>🪙</span>
<span>🪙</span>
<span>🪙</span>


</div>





<h2>

🔥 عروض CouponHub العالمية

</h2>



<p>

اكتشف أفضل المنتجات والعروض الحصرية

</p>






<div className="products-grid">



{

products.map((item,index)=>(


<div

className="product-card"

key={index}

>


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
