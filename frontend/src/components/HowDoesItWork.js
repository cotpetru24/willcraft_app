import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'



const HowDoesItWork = () => {
  return (
    <>
      <Carousel variant='dark' interval={null}>
      <Carousel.Item>
        <Container>
          <Row className="d-flex align-items-center">
            <Col xs={12} md={6}>
              <img
                className="d-block w-100"
                src='/typing.png'
                alt="First slide"
              />
            </Col>
            <Col xs={12} md={6} className="d-flex align-items-center">
              <div>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Carousel.Item>
      <Carousel.Item>
        <Container>
          <Row className="d-flex align-items-center">
            <Col xs={12} md={6}>
              <img
                className="d-block w-100"
                src='/printer.png'
                alt="First slide"
              />
            </Col>
            <Col xs={12} md={6} className="d-flex align-items-center">
              <div>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Carousel.Item>
      <Carousel.Item>
        <Container>
          <Row className="d-flex align-items-center">
            <Col xs={12} md={6}>
              <img
                className="d-block w-100"
                src='/signing.png'
                alt="First slide"
              />
            </Col>
            <Col xs={12} md={6} className="d-flex align-items-center">
              <div>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Carousel.Item>
      </Carousel>
    </>
  );
}

export default HowDoesItWork;