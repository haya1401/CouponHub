import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";

import "./FeaturedCoupons.css";



async function copyCode(code, affiliate) {

  let newWindow = null;


  if (
    affiliate &&
    affiliate.startsWith("http")
  ) {

    newWindow = window.open(
      "about:blank",
      "_blank"
    );

  }


  try {

    await navigator.clipboard.writeText(code);

    alert("✅ تم نسخ الكود: " + code);


  } catch(error) {

    console.error(
      "خطأ النسخ:",
      error
    );

  }


  if(
    newWindow &&
    affiliate
  ){

    newWindow.location.href = affiliate;

  }

}




export default function FeaturedCoupons(){


const [coupons,setCoupons] = useState([]);

const [search,setSearch] = useState([]);



useEffect(()=>{


async function loadCoupons(){


const querySnapshot =
await getDocs(
collection(db,"coupons")
);



const data=[];



querySnapshot.forEach((doc)=>{


const item=doc.data();


data.push({

id:doc.id,

...item,

affiliate:
item.affiliate || ""

});


});



setCoupons(data);



}



loadCoupons();



},[]);






const filteredCoupons =
coupons.filter((coupon)=>

(coupon.store || "")

.toLowerCase()

.includes(
search.toLowerCase()
)

);





function cardMove(e){


const card =
e.currentTarget;


const rect =
card.getBoundingClientRect();



const x =
e.clientX - rect.left;



const y =
e.clientY - rect.top;



const rotateX =
(y - rect.height / 2) / 15;



const rotateY =
(rect.width / 2 - x) / 15;



card.style.transform =
`
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-12px)
`;



}



function resetCard(e){


e.currentTarget.style.transform =
"rotateX(0) rotateY(0) translateY(0)";


}






return(


<section
id="featured-coupons"
className="featured-section"
>



<h2 className="featured-title">

⭐ أفضل الكوبونات

</h2>





<div className="coupon-search">


<input

type="text"

placeholder="🔍 ابحث باسم المتجر..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>


</div>







<div className="coupon-grid">


{

filteredCoupons.map((coupon)=>(


<div

key={coupon.id}

className="coupon-card"

onMouseMove={cardMove}

onMouseLeave={resetCard}

>



<div className="shine"></div>



<h3>

{coupon.store}

</h3>





<h1>

{coupon.discount}

</h1>






<div className="coupon-code">

{coupon.code}

</div>







<button

onClick={()=>


copyCode(

coupon.code,

coupon.affiliate

)


}

>

📋 نسخ الكوبون

</button>






{

coupon.affiliate &&

<p className="affiliate">

🔗 رابط أفلييت جاهز

</p>


}



</div>



))


}


</div>






{

filteredCoupons.length===0 &&

<p className="empty">

لا توجد كوبونات مطابقة للبحث.

</p>


}



</section>


);


}
