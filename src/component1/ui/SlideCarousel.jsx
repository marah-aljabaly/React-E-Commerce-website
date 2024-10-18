//كود تجريبي والصور تجريبية وعشوائية
import Carousel from 'react-bootstrap/Carousel';
export default function SlideCarousel() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-50 ms-5"
          src="https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-50 ms-5"
          src="https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-50 ms-5"
          src="https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}


{/* <Carousel data-bs-theme="dark">
{slides.map((slide, index) => (
  <Carousel.Item key={index}>
    <img
      className="d-block w-100"
      src={slide}
      alt={`Slide ${index + 1}`}
    />
    <Carousel.Caption>
      <h5>Slide {index + 1} label</h5>
      <p>Description for slide {index + 1}</p>
    </Carousel.Caption>
  </Carousel.Item>
))}
</Carousel> */}