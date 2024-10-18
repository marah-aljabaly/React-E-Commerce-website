import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './header.css'
import { useNavigate } from "react-router-dom";

export default function MainHeader() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar expand="md"className="shadow">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")} className='fs-3'>MyLogo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-5 fs-5">
              <Nav.Link onClick={() => navigate("/")} className="pe-4">Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/cart")}  className="pe-4">Cart</Nav.Link>
              <NavDropdown title="Category" id="basic-nav-dropdown" className="pe-4">
                <NavDropdown.Item onClick={() => navigate(`/category/men's clothing`)}>Men Clothing</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate(`/category/jewelery`)}>
                Jewelery
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate(`/category/electronics`)}>Electronics</NavDropdown.Item> 
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate(`/category/women's clothing`)}>
                Women Clothing</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}






{/* <div className="search">
      <input type="text" placeholder="What are you looking for?" />
      <button>
        <AiOutlineSearch />
      </button>
    </div>
    <div className="right-header">
      <div className="login">
        <p>Hello. <a href="#">Log in</a> </p>
      </div>
      <div className="cart">
        <a href="cart.html"></a>
        <p>Cart</p>
        <span id="qunatity">0</span>
      </div>
    </div> */}