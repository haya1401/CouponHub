import { useEffect } from "react";


export default function ScrollReveal(){


useEffect(()=>{



function revealElements(){



const elements =

document.querySelectorAll(
".reveal"
);





const observer =

new IntersectionObserver(


(entries)=>{



entries.forEach((entry)=>{



if(entry.isIntersecting){



entry.target.classList.add(
"show"
);



observer.unobserve(
entry.target
);



}



});



},


{

threshold:0.15

}



);







elements.forEach((el)=>{


observer.observe(el);


});




return observer;


}






const observer = revealElements();





// إعادة الفحص بعد تحميل عناصر Firebase

const timer = setTimeout(()=>{


revealElements();


},1000);






return ()=>{


if(observer){

observer.disconnect();

}


clearTimeout(timer);


};



},[]);





return null;


}
