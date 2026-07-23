import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {

  return (

    <header className="header">

      <div className="container header-container">


        <h2 className="logo">

          CouponHub

        </h2>



        <nav className="nav">


          <Link to="/" >
            الرئيسية
          </Link>


          <Link to="/stores">
            المتاجر
          </Link>


          <Link to="/coupons">
            الكوبونات
          </Link>


          <Link to="/categories">
            التصنيفات
          </Link>


          <Link to="/contact">
            اتصل بنا
          </Link>


        </nav>


      </div>


    </header>

  );

}
