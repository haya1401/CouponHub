import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";
import "./Categories.css";


export default function Categories() {


  const [categories, setCategories] = useState([]);

  const [error, setError] = useState(false);



  useEffect(() => {

    async function loadCategories(){

      try {

        const snapshot = await getDocs(
          collection(db,"categories")
        );


        setCategories(

          snapshot.docs.map((doc)=>(

            {
              id:doc.id,
              ...doc.data()
            }

          ))

        );


      } catch(err){

        console.error(
          "Categories loading error:",
          err
        );

        setError(true);

      }

    }


    loadCategories();


  },[]);



  return (

    <section className="categories-section">


      <div className="container">


        <h2 className="categories-title">

          📂 تصفح حسب التصنيف

        </h2>



        <div className="categories-grid">


          {categories.map((item)=>(


            <div

              key={item.id}

              className="category-card"

            >


              <div className="category-icon">

                {item.icon}

              </div>



              <h3>

                {item.name}

              </h3>



              <button className="category-btn">

                عرض الكوبونات

              </button>


            </div>


          ))}


        </div>




        {categories.length === 0 && !error && (

          <p className="empty-category">

            لا توجد تصنيفات حالياً

          </p>

        )}



        {error && (

          <p className="empty-category">

            تعذر تحميل التصنيفات حالياً

          </p>

        )}



      </div>


    </section>

  );

}
