import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";

import { db } from "../../firebase";

export default function CouponManager() {

  const [coupons, setCoupons] = useState([]);

  const [form, setForm] = useState({

    title: "",
    code: "",
    store: "",
    discount: "",
    affiliate: ""

  });

  const [editId, setEditId] = useState(null);

  async function loadCoupons() {

    const snapshot = await getDocs(
      collection(db, "coupons")
    );

    const data = snapshot.docs.map(item => ({

      id: item.id,

      ...item.data()

    }));

    setCoupons(data);

  }

  useEffect(() => {

    loadCoupons();

  }, []);

  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  }

  async function saveCoupon() {

    if (
      !form.title ||
      !form.code ||
      !form.store
    ) return;

    if (editId) {

      await updateDoc(

        doc(db, "coupons", editId),

        form

      );

      setEditId(null);

    } else {

      await addDoc(

        collection(db, "coupons"),

        form

      );

    }

    setForm({

      title: "",
      code: "",
      store: "",
      discount: "",
      affiliate: ""

    });

    loadCoupons();

  }

  async function deleteCoupon(id) {

    await deleteDoc(

      doc(db, "coupons", id)

    );

    loadCoupons();

  }

  function editCoupon(item) {

    setForm({

      title: item.title || "",

      code: item.code || "",

      store: item.store || "",

      discount: item.discount || "",

      affiliate: item.affiliate || ""

    });

    setEditId(item.id);

  }

  return (

    <div className="manager">

      <h2>
        إدارة الكوبونات
      </h2>

      <input

        name="title"

        value={form.title}

        onChange={handleChange}

        placeholder="اسم العرض"

      />

      <input

        name="code"

        value={form.code}

        onChange={handleChange}

        placeholder="كود الخصم"

      />

      <input

        name="store"

        value={form.store}

        onChange={handleChange}

        placeholder="المتجر"

      />

      <input

        name="discount"

        value={form.discount}

        onChange={handleChange}

        placeholder="نسبة الخصم"

      />

      <input

        name="affiliate"

        value={form.affiliate}

        onChange={handleChange}

        placeholder="رابط الأفلييت"

      />

      <button onClick={saveCoupon}>

        {editId ? "تحديث" : "إضافة كوبون"}

      </button>

      <hr />

      {

        coupons.map(coupon => (

          <div
            key={coupon.id}
            className="item"
          >

            <b>
              {coupon.title}
            </b>

            <span>
              {coupon.code}
            </span>

            <span>
              {coupon.store}
            </span>

            <span>
              {coupon.discount}
            </span>

            <div
              style={{
                fontSize: "12px",
                color: "#666",
                marginTop: "6px",
                wordBreak: "break-all"
              }}
            >
              {coupon.affiliate}
            </div>

            <button

              onClick={() =>
                editCoupon(coupon)
              }

            >

              تعديل

            </button>

            <button

              onClick={() =>
                deleteCoupon(coupon.id)
              }

            >

              حذف

            </button>

          </div>

        ))

      }

    </div>

  );

}
