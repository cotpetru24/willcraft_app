import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from "react";

const KidsCard = () => {
    const navigate = useNavigate();

    const testator = useSelector(state => state.testator)
    const assetsData = useSelector(state => state.assets);

    const isKidsComplete = (data) => {
        return testator.hasChildrenStatus === 'no' || (Array.isArray(data) && (data.length > 0))
    };

    const allNecessaryFieldsSpecified = isKidsComplete(assetsData);


    return (
        <>
            <Container className="mb-5">
                <Card className="shadow" bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col xs={10}>
                                    <h2>Assets Distribution</h2>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center">
                                    {allNecessaryFieldsSpecified ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                                    ) : (
                                        <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                                    )}
                                </Col>
                            </Row>
                        </Card.Title>
                        {allNecessaryFieldsSpecified ? (
                            <Card.Text as="div"> {/* Ensure it's using a div */}
                                {assetsData.map((asset, assetIndex) => (
                                    <React.Fragment key={assetIndex}>
                                        <Row className="mb-4">
                                            <Col>
                                                {asset.assetType === 'Bank Account' && (
                                                    <div className="order-item-p">
                                                        <strong>{asset.assetType} - {asset.bankName}</strong>
                                                    </div>
                                                )}

                                                {asset.assetType === 'Property' && (
                                                    <div className="order-item-p">
                                                        <strong>{asset.assetType} - {asset.propertyAddress}</strong>
                                                    </div>
                                                )}

                                                {asset.assetType === 'Stocks and shares' && (
                                                    <div className="order-item-p">
                                                        <strong>{asset.assetType} - {asset.companyName}</strong>
                                                    </div>
                                                )}

                                                {(asset.assetType === 'Pension' || asset.assetType === 'Life insurance') && (
                                                    <div className="order-item-p">
                                                        <strong>{asset.assetType} - {asset.provider}</strong>
                                                    </div>
                                                )}

                                                {asset.assetType === 'Other' && (
                                                    <div className="order-item-p">
                                                        <strong>{asset.assetType} - {asset.otherAssetDetails}</strong>
                                                    </div>
                                                )}

                                                {asset.distribution.map((beneficiary, beneficiaryIndex) => (
                                                    <div key={beneficiaryIndex} className="order-item-p">
                                                        {beneficiary.personId.fullLegalName} - <strong>{beneficiary.receivingAmount}%</strong>
                                                    </div>
                                                ))}

                                            </Col>
                                        </Row>
                                    </React.Fragment>
                                ))}

                                <Row className="d-flex justify-content-end">
                                    <Col xs="auto">
                                        <Button
                                            variant="primary"
                                            className="creating-order-tile-btns"
                                            onClick={() => navigate('/assetsDistribution')}
                                        >
                                            Edit
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Text>
                        ) : (
                            <>
                                {testator.hasChildrenStatus === "no" ? (
                                    <>
                                        <Row>
                                            <Col>
                                                <div>You said you don't have children</div>
                                            </Col>
                                        </Row>
                                        <Row className="d-flex justify-content-end">
                                            <Col xs="auto">
                                                <Button
                                                    variant="primary"
                                                    className="m-1"
                                                    onClick={() => navigate('/assetsDistribution')}
                                                >
                                                    Edit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <>
                                        <Row>
                                            <Col>
                                                <div>Tell us about your children</div>
                                            </Col>
                                        </Row>
                                        <Row className="d-flex justify-content-end">
                                            <Col xs="auto">
                                                <Button
                                                    variant="primary"
                                                    className="m-1 creating-order-tile-btns"
                                                    onClick={() => navigate('/kids')}
                                                >
                                                    Get Started
                                                </Button>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default KidsCard;
