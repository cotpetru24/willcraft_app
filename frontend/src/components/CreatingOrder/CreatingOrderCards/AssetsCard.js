import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from "react";


const AssetsCard = () => {
    const navigate = useNavigate();

    const assetsData = useSelector(state => state.assets);

    // const isAssetsComplete = (data) => {
    //     Array.isArray(data) && (data.length > 0)
    // };

    // const allNecessaryFieldsSpecified = isAssetsComplete(assetsData);


    return (
        <>

            <Container className="mb-5">
                <Card className='shadow' bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col xs={10}>
                                    <h2>Your Assets</h2>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center">
                                    {(Array.isArray(assetsData) && (assetsData.length > 0)) ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                                    ) : (
                                        <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                                    )}
                                </Col>
                            </Row>
                        </Card.Title>
                        {(Array.isArray(assetsData) && (assetsData.length > 0)) ? (
                            <Card.Text>
                                {assetsData.map((asset, index) => (
                                    <React.Fragment key={index}>
                                        <Row className="mb-4">
                                            <Col>
                                                <p className="order-item-p">
                                                    <span className="order-item-p-span">Asset: </span>
                                                    {asset.assetType}
                                                </p>


                                                {asset.assetType === 'Property' && (
                                                    <>
                                                        <p className="order-item-p">
                                                            <span className="order-item-p-span">Address: </span>
                                                            {asset.propertyAddress}
                                                        </p>
                                                    </>
                                                )}
                                                {asset.assetType === 'Bank Account' && (
                                                    <>
                                                        <p className="order-item-p">
                                                            <span className="order-item-p-span">Bank Name: </span>
                                                            {asset.bankName}
                                                        </p>
                                                    </>
                                                )}
                                                {asset.assetType === 'Stocks and shares' && (
                                                    <>
                                                        <p className="order-item-p">
                                                            <span className="order-item-p-span">Company Name: </span>
                                                            {asset.companyName}
                                                        </p>
                                                    </>
                                                )}
                                                {(asset.assetType === 'Pension' || asset.assetType === 'Life insurance') && (
                                                    <>
                                                        <p className="order-item-p">
                                                            <span className="order-item-p-span">Provider: </span>
                                                            {asset.provider}
                                                        </p>
                                                    </>
                                                )}
                                                {asset.assetType === 'Other' && (
                                                    <>
                                                        <p className="order-item-p">
                                                            <span className="order-item-p-span">Details: </span>
                                                            {asset.otherAssetDetails}
                                                        </p>
                                                    </>
                                                )}
                                            </Col>
                                        </Row>
                                    </React.Fragment>
                                ))}
                                <Row className="d-flex justify-content-end">
                                    <Col xs="auto">
                                        <Button variant="primary" className="creating-order-tile-btns"
                                            onClick={() => navigate('/assets')}
                                        >Edit</Button>
                                    </Col>
                                </Row>
                            </Card.Text>
                        ) : (
                            <>
                                <Row>
                                    <Col>
                                        <p>Tell us about your assets</p>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-end">
                                    <Col xs="auto">
                                        <Button variant="primary" className="m-1"
                                            onClick={() => navigate('/assets')}
                                        >Get Started</Button>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Container >
        </>
    );
}

export default AssetsCard;
