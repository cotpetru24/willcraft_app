import styles from "../common/styles";
import { useState, useEffect } from "react";
import { Accordion, Card, Button, Col, Row, Form, Container, InputGroup } from "react-bootstrap";

const SectionListItem = ({ buttonsDisabled, data, onRemove, onEdit, section, onChecked, asset, onChange, assetIndex }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [receivingAmount, setReceivingAmount] = useState('');



    useEffect(() => {
        if (data.role && data.role.includes("executor")) {
            setIsChecked(true);
        }
        if (section === 'assetDistribution-beneficiary' && asset?.distribution) {
            const isInDistribution = asset.distribution.some(dist => dist.personId._id === data._id);
            setIsChecked(isInDistribution);

            if (isInDistribution) {
                const currentAmount = asset.distribution.find(dist => dist.personId._id === data._id)?.receivingAmount || '';
                setReceivingAmount(currentAmount);
            }
        }


        ////////// ---------------this works fine -------don't delete until fullly tested

        // if (section === 'assetDistribution-additionalBeneficiary' && asset?.distribution) {
        //     const isInDistribution = asset.distribution.some(dist => dist.personId?._id === data._id);
        //     setIsChecked(isInDistribution);
        // }


        if (section === 'assetDistribution-beneficiary' && asset?.distribution) {
            const distribution = asset.distribution.find(dist => dist.personId._id === data._id);

            if (distribution) {
                setIsChecked(true);
                setReceivingAmount(distribution.receivingAmount || '');
            } else {
                setIsChecked(false);
                setReceivingAmount('');
            }
        }
    }, [data.role, section, data._id]);

    const currentReceivingAmount = asset?.distribution?.find(dist => dist.personId._id === data._id)?.receivingAmount || '';

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        console.log(`section item => Checkbox state changing to: ${newCheckedState} for person: ${data.fullLegalName}`);
        setIsChecked(newCheckedState);
        onChecked(newCheckedState);  // Pass the new checked state to the callback
    };



    const handleAmountChange = (event) => {
        const value = event.target.value;
        setReceivingAmount(value);
        onChange(value, assetIndex, data._id); // Pass the value, assetIndex, and data._id to the parent
    };

    return (
        <>

            {section === 'kids' && (
                <>
                    <Container className="mb-3">
                        <Row>
                            <Col>
                                <Card className='shadow' bg="light" text="dark" style={{ borderColor: 'green' }}>
                                    <Card.Body>
                                        <Card.Text>
                                            <Row>
                                                <Col>
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Name:  </span>{data.title} {data.fullLegalName}</p>
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Date of birth:  </span>{new Date(data.dob).toLocaleDateString()}</p>
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Address:  </span>{data.fullAddress}</p>
                                                </Col>
                                            </Row>
                                            <Row className="d-flex justify-content-end mt-1">
                                                <Col xs="auto">
                                                    <Button
                                                        variant="info"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onEdit}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onRemove}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
            {section === 'assets' && (
                <>
                    <Container className="mb-3">
                        <Row>
                            <Col>
                                <Card className='shadow' bg="light" text="dark" style={{ borderColor: 'green' }}>
                                    <Card.Body>
                                        <Card.Text>
                                            <Row>
                                                <Col>
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Asset: </span>{data.assetType}</p>
                                                    {data.assetType === 'Property' && (
                                                        <p className="order-item-p"><span className="order-item-p-span">
                                                            Address: </span>{data.propertyAddress}
                                                        </p>
                                                    )}
                                                    {data.assetType === 'Bank Account' && (
                                                        <p className="order-item-p"><span className="order-item-p-span">
                                                            Bank Name: </span>{data.bankName}
                                                        </p>
                                                    )}
                                                    {data.assetType === 'Stocks and shares' && (
                                                        <p className="order-item-p"><span className="order-item-p-span">
                                                            Company Name: </span>{data.companyName}
                                                        </p>
                                                    )}
                                                    {(data.assetType === 'Pension' || data.assetType === 'Life insurance') && (
                                                        <p className="order-item-p"><span className="order-item-p-span">
                                                            Provider: </span>{data.provider}
                                                        </p>
                                                    )}
                                                    {data.assetType === 'Other' && (
                                                        <p className="order-item-p"><span className="order-item-p-span">
                                                            Details: </span>{data.otherAssetDetails}
                                                        </p>
                                                    )}
                                                </Col>
                                            </Row>
                                            <Row className="d-flex justify-content-end mt-1">
                                                <Col xs="auto">
                                                    <Button
                                                        variant="info"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onEdit}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onRemove}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
            {section === 'executors' && (
                <>
                    <Container className="mb-3">
                        <Row>
                            <Col>
                                <Card className='shadow' bg="light" text="dark" style={{ borderColor: 'green' }}>
                                    <Card.Body>
                                        <Card.Text>
                                            <Row>
                                                <Col>
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Name:  </span>{data.personId.title} {data.personId.fullLegalName}</p>
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Date of birth:  </span>{new Date(data.personId.dob).toLocaleDateString()}</p>
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Address:  </span>{data.personId.fullAddress}</p>
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Executor"
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                        disabled={buttonsDisabled}
                                                    />
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
            {section === 'additional-executors' && (
                <>
                    <Container className="mb-3">
                        <Row>
                            <Col>
                                <Card className='shadow' bg="light" text="dark" style={{ borderColor: 'green' }}>
                                    <Card.Body>
                                        <Card.Text>
                                            <Row>
                                                <Col>
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Name:  </span>{data.title} {data.fullLegalName}</p>
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Date of birth:  </span>{new Date(data.dob).toLocaleDateString()}</p>
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Address:  </span>{data.fullAddress}</p>
                                                </Col>
                                            </Row>
                                            <Row className="d-flex justify-content-end mt-1">
                                                <Col xs="auto">
                                                    <Button
                                                        variant="info"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onEdit}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onRemove}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}


            {section === 'assetsDistribution-asset' && (
                <>
                    <Container>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <p className="order-item-p"><span className="order-item-p-span">
                                                    Asset:  </span>{data.assetType}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {data.assetType === 'Property' &&
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Address:  </span>{data.propertyAddress}</p>}
                                                {data.assetType === 'Bank Account' &&
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Bank Name:  </span>{data.bankName}</p>}
                                                {data.assetType === 'Stocks and shares' &&
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Company Name:  </span>{data.companyName}</p>}
                                                {(data.assetType === 'Pension' || data.assetType === 'Life insurance') &&
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Provider:  </span>{data.provider}</p>}
                                                {data.assetType === 'Other' &&
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Details:  </span>{data.otherAssetDetails}</p>}
                                            </Col>
                                        </Row>
                                    </Container>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            Spouse here
                                        </Card.Body>
                                    </Card>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            Kid 1 here
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Header>Card #3</Card.Header>
                                        <Card.Body>
                                            This is the content for the third card. You can place any content here.
                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Container>
                </>
            )}
            {section === 'assetDistribution-beneficiary' && (
                <>
                    <Container className="p-0">
                        <Card
                            className={`mb-3 ${isChecked ? 'bg-warning text-dark' : 'bg-light text-dark'}`}>
                            <Card.Body>

                                <Row>
                                    <Col>
                                        <p className="order-item-p"><span className="order-item-p-span">
                                            Name:  </span>{data.title} {data.fullLegalName}</p>
                                        <p className="order-item-p"><span className="order-item-p-span">
                                            Date of birth:  </span>{new Date(data.dob).toLocaleDateString()}</p>
                                        <p className="order-item-p"><span className="order-item-p-span">
                                            Address:  </span>{data.fullAddress}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex align-items-end">
                                        <Form.Check
                                            type="checkbox"
                                            label="Beneficiary"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                            disabled={buttonsDisabled}
                                        />
                                    </Col>
                                    {isChecked && (
                                        <Col>
                                            <Form.Group as={Row} controlId="formShareAmount" className="align-items-center">
                                                <Col>
                                                    <InputGroup className="receiving-amount-form-control">
                                                        <InputGroup.Text>Share</InputGroup.Text>
                                                        <Form.Control
                                                            type="text"
                                                            value={receivingAmount}
                                                            onChange={handleAmountChange}
                                                            disabled={buttonsDisabled}
                                                        />
                                                        <InputGroup.Text>%</InputGroup.Text>
                                                    </InputGroup>
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    )}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                </>
            )}
            {section === 'assetDistribution-additionalBeneficiary' && (
                <>
                    <Container className="mb-3">
                        <Row>
                            <Col>
                                <Card className='shadow' bg="light" text="dark" style={{ borderColor: 'green' }}>
                                    <Card.Body>
                                        <Card.Text>
                                            <Row>
                                                <Col>
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Name:  </span>{data.title} {data.fullLegalName}</p>
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Date of birth:  </span>{new Date(data.dob).toLocaleDateString()}</p>
                                                    <p className="order-item-p"><span className="order-item-p-span">
                                                        Address:  </span>{data.fullAddress}</p>
                                                </Col>
                                            </Row>
                                            <Row className="d-flex justify-content-end mt-1">
                                                <Col xs="auto">
                                                    <Button
                                                        variant="info"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onEdit}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onRemove}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </>
    );

}

export default SectionListItem;
