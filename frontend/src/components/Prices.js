import React from "react";
import Card from 'react-bootstrap/Card'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";



const Prices = () => {
    return (<>
        {/* <div className="pricing-component-container">
            <section className="price-container">
                <img src="./accept_terms.png" />
                <h3 className="price-heading">
                    Wills
                </h3>
                <h2 className="price-price">£20</h2>
                <h4 className="price-subheading">each</h4>


            </section>

            <section className="price-container">
                <img src="./printing_invoice.png" />
                <h3 className="price-heading">
                    Printing
                </h3>
                <h2 className="price-price">£5</h2>
                <h4 className="price-subheading">per will</h4>


            </section>

            <section className="price-container">
                <img src="./storage.png" />
                <h3 className="price-heading">
                    Storage
                </h3>
                <h2 className="price-price">£25</h2>
                <h4 className="price-subheading">per annum</h4>

            </section>
        </div>

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>    */}


        <Container>
            <Row>
                <Card className='home-review-card m-2' bg="light" text="dark">
                    <Card.Img variant="top" src="./accept_terms.png" />
                    <Card.Body>
                        <Card.Title>Wills starting from £20 + VAT</Card.Title>
                        <Card.Text>
                            Creating a will is a crucial step in ensuring that your wishes are respected and your loved ones are protected.
                            Our basic will creation service starts at just £20 plus VAT. This option provides you with a comprehensive, legally sound
                            will that covers all the essentials, making it both affordable and accessible. Begin the process today and gain peace of
                            mind knowing your affairs are in order.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='home-review-card m-2' bg="light" text="dark">
                    <Card.Img variant="top" src="./printing_invoice.png" />
                    <Card.Body>
                        <Card.Title>Printing service for £10 + VAT</Card.Title>
                        <Card.Text>
                            Once your will is drafted, it’s important to have a clear, professionally printed copy for your records and for legal validation.
                            We offer a high-quality printing service for only £10 plus VAT. Our service ensures that your will is printed on premium paper,
                            giving it the durability and professionalism it deserves. Whether you need one copy or several, we’ve got you covered.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='home-review-card m-2' bg="light" text="dark">
                    <Card.Img variant="top" src="./storage.png" />
                    <Card.Body>
                        <Card.Title>Document storage at £25 per annum</Card.Title>
                        <Card.Text>
                            Keeping your will safe is just as important as creating it. Our secure document storage service is available for £25 per annum, plus VAT.
                            By choosing our storage service, you ensure that your will is protected from loss, damage, or unauthorized access. We store your will
                            in a secure, climate-controlled environment, providing you with the assurance that your final wishes are safeguarded for the future.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='home-review-card m-2' bg="light" text="dark">
                    <Card.Img variant="top" src="./storage.png" />
                    <Card.Body>
                        <Card.Title>Custom Wills and Consultations</Card.Title>
                        <Card.Text>
                            <h5>Contact our enquiries team</h5>
                            For those with more complex needs, we offer custom will drafting and personalized consultations. Whether you have unique requirements
                            or need expert advice, our experienced team is here to assist you. To discuss your specific situation and get a tailored quote,
                            please contact our enquiries team directly at +44 02454654654. We’re here to help you create a will that meets all your needs.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    </>
    )

}

export default Prices;