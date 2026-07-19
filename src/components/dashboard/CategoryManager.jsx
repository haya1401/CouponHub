import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase";

export default function CategoryManager() {

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  const [editId, setEditId] = useState(null);


  async function loadCategories() {

    const snapshot = await getDocs(
      collection(db, "categories")
    );

    const data = snapshot.docs.map(item => ({
      id: item.id,
      ...item.data()
    }));

    setCategories(data);

  }


  useEffect(() => {

    loadCategories();

  }, []);



  async function saveCategory() {

    if (!name.trim()) return;


    if (editId) {

      await updateDoc(
        doc(db, "categories", editId),
        {
          name
        }
      );

      setEditId(null);


    } else {

      await addDoc(
        collection(db, "categories"),
        {
          name
        }
      );

    }


    setName("");

    loadCategories();

  }



  async function deleteCategory(id) {

    await deleteDoc(
      doc(db, "categories", id)
    );

    loadCategories();

  }



  function editCategory(category) {

    setName(category.name);

    setEditId(category.id);

  }



  return (

    <div className="manager">

      <h2>
        إدارة التصنيفات
      </h2>


      <div>

        <input

          value={name}

          onChange={
            e => setName(e.target.value)
          }

          placeholder="اسم التصنيف"

        />


        <button onClick={saveCategory}>

          {editId ? "تحديث" : "إضافة"}

        </button>


      </div>



      <hr />


      {

        categories.map(category => (

          <div
            key={category.id}
            className="item"
          >

            <span>
              {category.name}
            </span>


            <button
              onClick={() => editCategory(category)}
            >
              تعديل
            </button>


            <button
              onClick={() => deleteCategory(category.id)}
            >
              حذف
            </button>


          </div>

        ))

      }


    </div>

  );

}
