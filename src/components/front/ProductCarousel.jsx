import { Carousel } from "react-bootstrap";

const ProductCarousel = () => {
  return (
    <Carousel fade>
      <Carousel.Item className="carousel-item">
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1620786963525-4a74f1697a46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>完美保護您的手機</h3>
          <p>完美貼合手機，不易滑落</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1624812334051-ea9b56962717?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>絕佳的防摔能力</h3>
          <p>360度防護手機，絕佳耐用度</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1614399113305-a127bb2ca893?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>精心設計，符合您的需求</h3>
          <p>高品質材料，手感柔軟舒適</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ProductCarousel;
