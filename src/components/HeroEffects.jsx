import { useEffect, useState } from "react";
import "./HeroEffects.css";


export default function HeroEffects(){

  const [coins,setCoins] = useState([]);


  useEffect(()=>{

    const items = [];

    for(let i=0;i<25;i++){

      items.push({
        id:i,
        left:Math.random()*100,
        delay:Math.random()*8,
        size:10 + Math.random()*20
      });

    }

    setCoins(items);

  },[]);



return (

<>

{
coins.map((coin)=>(

<span
key={coin.id}
className="falling-coin"

style={{
left:`${coin.left}%`,
animationDelay:`${coin.delay}s`,
width:`${coin.size}px`,
height:`${coin.size}px`
}}

>
🪙
</span>

))

}

</>

);

}
