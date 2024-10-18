import { useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import './home.css';
import { AiOutlineSearch } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import MainHeader from "../../ui/header/MainHeader";
import SlideCarousel from "../../ui/SlideCarousel";

export default function HomePage() {
  let quantity = document.querySelector('.topHome .cart button .quantity');
  console.log(quantity);
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  

  function addToCart(id) {
    document.cookie += `${id},`; 
  }

  let arrayOfProductsFromCookie =  document.cookie.split(',');
  let productNum = [...new Set(arrayOfProductsFromCookie)]; // set=> remove repeated elements and ... => to convert set to array

  let qty =  productNum.length -1;
  console.log(qty);

  useEffect(()=>{
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setIsLoading(false); // توقف اللودر بعد التحميل
        console.log('Success');
        console.log(res.data);
      })
      .catch(() => {
        console.log('failed');
        setIsLoading(false); // توقف اللودر بعد التحميل
      });
  },[]);

  if (isLoading) {
    return (
      <div className="bg-dark text-light w-100 text-center fs-6" style={{height: 100 +'vh', paddingTop: 20 +'rem'}}>
        <strong>Loading...</strong>
      </div>
    ); // عرض اللودر هنا
  }
  
  let slides = [products[5].image, products[15].image,products[10].image];

  return (
    <>
      <MainHeader />
      <div className="topHome ms-3 me-3 mt-4 mb-5">
        <div className='search w-75'>
          <input type="text" placeholder="What are you looking for?"/>
          <button className='bg-primary text-light fs-5'>
            <AiOutlineSearch />
          </button>  
        </div>
        <div className="cart">
          <button type="button" className="btn position-relative ms-5">
            <FaCartShopping onClick={() => navigate("/cart")} className="fs-1"/>
            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger quantity">
              {qty}
              <span className="visually-hidden">unread messages</span> 
            </span>
          </button>
        </div>
      </div>

      <SlideCarousel slides={slides}/>
      <div className="products" style={{marginBottom: '7rem'}}>
        {products.map((product) => { return (
          <div className = "product card shadow" key={product.id}>
            <div className = "imag">
              <img src={product.image} />
            </div>
            <div className = "product-info p-2">
              <div className ="title fs-5 mt-3 mb-1">
                <p>{product.title}</p> 
              </div>
              <div className = "price-and-rating">
                <p className="price fs-4 mt-5 text-primary">{product.price}$</p>
              </div>
              <p className="fs-4">Free Shipping</p>
              <span className='fs-6'>Quantity: {product.rating.count}</span>
            </div>
            <p className="check-add"> Product added to cart</p>
            <button className = "btn btn-success w-100 mb-2" onClick={() => {
              addToCart(product.id);
            }}>Add to Cart</button>
            <p onClick={()=> navigate(`/product/${product.id}`)} className="btn btn-primary w-100">Show Details</p>
          </div>
          )}
        )} 
      </div>
    </>
  )
}

{/* <div className = "rating">
              <i className="fa-solid fa-star" style="color: #f9c815;"></i>
              <i className="fa-solid fa-star" style="color: #f9c815;"></i>
              <i className="fa-solid fa-star" style="color: #f9c815;"></i>
              <i className="fa-solid fa-star" style="color: #f9c815;"></i>
              <i className="fa-regular fa-star" style="color: #f9c815;"></i>
            </div> */}
