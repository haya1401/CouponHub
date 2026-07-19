import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase";


export default function StoreManager() {


  const [stores, setStores] = useState([]);

  const [form, setForm] = useState({
    name: "",
    url: "",
    logo: "",
  });


  const [editId, setEditId] = useState(null);



  async function loadStores() {

    const snapshot = await getDocs(
      collection(db, "stores")
    );


    const data = snapshot.docs.map(item => ({
      id: item.id,
      ...item.data()
    }));


    setStores(data);

  }



  useEffect(() => {

    loadStores();

  }, []);




  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  }




  async function saveStore() {


    if (!form.name.trim()) return;



    if (editId) {


      await updateDoc(

        doc(db, "stores", editId),

        form

      );


      setEditId(null);



    } else {


      await addDoc(

        collection(db, "stores"),

        form

      );


    }



    setForm({

      name: "",
      url: "",
      logo: ""

    });


    loadStores();


  }




  function editStore(store) {


    setForm({

      name: store.name || "",

      url: store.url || "",

      logo: store.logo || ""

    });


    setEditId(store.id);


  }




  async function deleteStore(id) {


    await deleteDoc(

      doc(db, "stores", id)

    );


    loadStores();


  }





  return (

    <div className="manager">


      <h2>
        🏪 إدارة المتاجر
      </h2>



      <input

        name="name"

        value={form.name}

        onChange={handleChange}

        placeholder="اسم المتجر"

      />



      <input

        name="url"

        value={form.url}

        onChange={handleChange}

        placeholder="رابط المتجر"

      />



      <input

        name="logo"

        value={form.logo}

        onChange={handleChange}

        placeholder="رابط شعار المتجر"

      />



      <button onClick={saveStore}>

        {editId ? "تحديث المتجر" : "➕ إضافة متجر"}

      </button>




      <hr />



      <h3>
        📋 جميع المتاجر
      </h3>



      {

        stores.map(store => (


          <div

            key={store.id}

            className="item"

          >


            <b>
              {store.name}
            </b>


            <br />

            <span>
              {store.url}
            </span>


            <br />


            <button

              onClick={() =>
                editStore(store)
              }

            >

              ✏️ تعديل

            </button>



            <button

              onClick={() =>
                deleteStore(store.id)
              }

            >

              🗑️ حذف

            </button>



          </div>


        ))

      }


    </div>

  );

}
