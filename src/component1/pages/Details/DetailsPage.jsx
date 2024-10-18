import { useParams , useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ditails.css'


export default function ProductDetails() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [product, setProduct] = useState(null);
 
  function addToCart(id) {
    document.cookie += `${id},`; 
  }

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {setProduct(response.data); console.log(response.data) ;console.log('success')})
      .catch((error) => {console.log(error); console.log('failed')});
  }, [id]);
  
  if (!product) return (
    <div className="bg-dark text-light w-100 text-center fs-6" style={{height: 100 +'vh',paddingTop: 20 +'rem'}}>
        <strong>Loading...</strong>
      </div>
  );

  return (
    <>
      <div className="card w-75 mb-5 shadow" style={{marginLeft: '10%', marginTop: '8%'}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={product.image} className="img-fluid rounded-start w-75 m-5" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body m-2">
              <h5 className="card-title mt-3 mb-4">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text"><strong className="text-body-secondary">{product.category}</strong></p>
              <p className="card-text fs-5"><strong className="text-danger">{product.price}$</strong></p>
              <p className="btn btn-primary w-100 mt-5 mb-0" onClick={() => {addToCart(product.id);}}>Add to cart</p>
              <a className="mt-5 fs-6 btn" onClick={() => navigate('/')} style={{ marginLeft: '30%'}}>Go to Home Page</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

 {/* <div className="row">
            <div className="col-4">
              <img src={product.image} className="img-fluid rounded-start ms-5 mt-5 me-0" alt="..." style={{width: '80%'}} />
            </div>
            <div  className="col-8">
              <div className="card-body mt-3 me-3" >
                <h4 className="card-title fs-2">{product.title}</h4>
                <p className="card-text pt-3">{product.description}</p>
                <p className="card-text"><strong className="text-body-secondary">{product.category}</strong></p>
                <p className="card-text fs-5"><strong className="text-danger">{product.price}$</strong></p>
                <p className="btn btn-primary w-100 mt-5 mb-0" onClick={() => {addToCart(product);}}>Add to cart</p>
                <a className="mt-5 fs-6 btn" onClick={() => navigate('/')} style={{marginTop: 0, marginLeft: '10rem'}}>Go to Home Page</a>
              </div>
            </div>
          </div> */}