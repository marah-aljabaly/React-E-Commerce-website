import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantities, setQuantities] = useState({}); //save quantity
  const navigate = useNavigate();

  function removeProduct(product){
    let newQuantities = {...quantities};
    delete newQuantities[product.id];
    setQuantities(newQuantities);
    document.cookie = document.cookie.replace(new RegExp(`${product.id},`), ''); // remove product from cookie
  }

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/`)
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="bg-dark text-light w-100 text-center fs-6" style={{height: '100vh', paddingTop: '20rem'}}>
        <strong>Loading...</strong>
      </div>
    );
  }

  let arrayOfProductsFromCookie = document.cookie.split(',');
  let productNum = [...new Set(arrayOfProductsFromCookie)]; // set=> remove repeated elements and ... => to convert set to array

  let cartProducts = productNum.map(id => products.find(product => product.id == id)).filter(Boolean); // العثور على المنتجات الموجودة في العربة

  const total = cartProducts.reduce((acc, product) => {
    const qty = quantities[product.id] || 1; // افتراض أن الكمية 1 إذا لم يتم تعيينها
    return acc + (product.price * qty);
  }, 0);

  return (
    <div>
      {cartProducts.length > 0 ? (
        <>
          <h1 className='text-center mt-5'>Shopping Cart {cartProducts.length}</h1>
          <hr />
          <div className="total w-25 m-4 fixed">
              <div className="top">
                <h4>Total: {total}$</h4>
              </div>
              <button className="bg-success p-2 d-block w-100">PROCEED TO CHECKOUT</button>
              <button className="bg-secondary p-2 d-block w-100 mt-2">SIGN IN TO ADD COUPON</button>
          </div>
          
          <div className="cart-details mb-5">
            <div className="products">
              {cartProducts.map((product) => (
                <div className="product card shadow" key={product.id}>
                  <div className="imag mt-5">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="product-info p-2 mb-3">
                    <div className="title fs-5 mt-3">
                      <p>{product.title}</p>
                    </div>
                    <p className="price fs-4 text-primary">{product.price}$</p>
                    <p className="fs-4">Free Shipping</p>
                    <span className='fs-6'>Quantity: </span>
                    <input
                      type="number"
                      min="1"
                      value={quantities[product.id] || 1} // استخدام الكمية المخزنة
                      onChange={(e) => {
                        const newQty = Math.max(1, e.target.value); // تأكد من أن الكمية لا تقل عن 1
                        setQuantities(prev => ({ ...prev, [product.id]: newQty }));
                      }}
                      placeholder='qty'
                    />
                  </div>
                  <button className="btn btn-danger w-100 mb-2" onClick={() => (removeProduct(product))}>Remove from Cart</button>
                  <p onClick={() => navigate(`/product/${product.id}`)} className="btn btn-primary w-100">Show Details</p>
                </div>
              ))}
            </div>
            <a className="mt-5 fs-4 btn" onClick={() => navigate('/')} style={{ marginLeft: '40%'}}>Go to Home Page</a>
          </div>
        </>
      ) : (
        <p className='text-danger'>No products found in the Cart.</p>
      )}
    </div>
  );
}
