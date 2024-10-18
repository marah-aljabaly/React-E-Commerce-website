
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./component1/pages/Homepage/HomePage";
import CartPage from "./component1/pages/cart/CartPage";
import DetailsPage from "./component1/pages/Details/DetailsPage";
import Category from "./component1/pages/category/Category";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
     <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/product/:id' element={<DetailsPage />} />
          <Route path='/category/:category' element={<Category />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </div>
      {/* <MainFooter /> */}
    </BrowserRouter> 
    </>
  );
}

export default App;

