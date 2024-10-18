import{ useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Category(){
    const navigate = useNavigate()
    const { category } = useParams(); // أخذ البارامتر من URL
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
      axios.get(`https://fakestoreapi.com/products/category/${category}`)
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
        console.log(response.data);
        console.log('success')
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        console.log('failed')
      });
      },[category]);
      
    if (isLoading) {
      return (
        <div className="bg-dark text-light w-100 text-center fs-6" style={{height: 100 +'vh', paddingTop: 20 +'rem'}}>
          <strong>Loading...</strong>
        </div>
      ); // عرض اللودر هنا
    }

  return (
      <div>
          <h1 className='text-center mt-5'>{products.length} {category} products</h1>
          {
            products.length > 0?
            <div className="products mt-4">
              {products.map((product) => (
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
                    <p className="shipping fs-4">Free Shipping</p>
                  </div>
                  <p className="check-add"> Product added to cart</p>
                  <button className = "btn btn-success w-100 mb-2" >Add to Cart</button>
                  <p onClick={()=> navigate(`/product/${product.id}`)} className="btn btn-primary w-100">Show Details</p>
                </div>
              ))}
            </div>
            :
            <p className='text-danger'>No products found in this category.</p>
          }
          <a className="mt-5 mb-5 fs-4 btn" onClick={() => navigate('/')} style={{ marginLeft: '40%'}}>Go to Home Page</a>
      </div>
  );

};
    
