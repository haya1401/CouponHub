import "./StoreLogos.css";


const stores = [

  {
    name:"Amazon",
    logo:"/logos/amazon.png",
  },

  {
    name:"Noon",
    logo:"/logos/noon.png",
  },

  {
    name:"SHEIN",
    logo:"/logos/shein.png",
  },

  {
    name:"AliExpress",
    logo:"/logos/aliexpress.png",
  },

];


export default function StoreLogos(){

  return (

    <section className="stores-section">


      <div className="container">


        <h2 className="stores-title">

          🏪 أشهر المتاجر

        </h2>



        <div className="stores-grid">


          {stores.map((store)=>(


            <div
              className="store-card"
              key={store.name}
            >


              <img

                src={store.logo}

                alt={store.name}

              />


              <h3>

                {store.name}

              </h3>


            </div>


          ))}


        </div>


      </div>


    </section>

  );

}
