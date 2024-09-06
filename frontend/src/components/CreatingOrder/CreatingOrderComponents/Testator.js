import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreatingOrderNavigation from "../CreatigOrderNavigation";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import constants from "../../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { updateTestatorSlice } from "../../../features/people/testator/testatorSlice";
import testatorThunks from "../../../features/people/testator/testatorThunks";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col";


const Testator = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const testator = useSelector((state) => state.testator);
  const savedTestatorData = useRef(null);
  const [testatorFormData, setTestatorFormData] = useState({
    _id: '',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel: '',
    maritalStatus: '',
  });


  useEffect(() => {
    if (testator) {
      setTestatorFormData({
        _id: testator._id || '',
        title: testator.title || '',
        fullLegalName: testator.fullLegalName || '',
        fullAddress: testator.fullAddress || '',
        dob: testator.dob ? new Date(testator.dob).toISOString().split('T')[0] : '',
        email: testator.email || '',
        tel: testator.tel || '',
        maritalStatus: testator.maritalStatus || '',
      });

      // Store the initial state of testator slice
      if (!savedTestatorData.current) {
        savedTestatorData.current = JSON.parse(JSON.stringify(testator));
      }

    }
  }, [testator]
  );


  const handleBack = () => {
    // Revert to the saved testator state
    if (savedTestatorData.current) {
      dispatch(updateTestatorSlice(savedTestatorData.current));
    }
    navigate('/creatingOrder');
  };


  const handleSaveAndContinue = async () => {
    if (!testator._id) {
      await dispatch(testatorThunks.createTestatorThunk(testator));
    } else {
      await dispatch(testatorThunks.updateTestatorThunk(testator));
    }
    navigate('/creatingOrder');
  };


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTestatorFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    dispatch(updateTestatorSlice({ ...testatorFormData, [name]: value }));
  };


  const handlePlaceSelected = (address) => {
    setTestatorFormData((prevData) => ({
      ...prevData,
      fullAddress: address
    }));

    dispatch(updateTestatorSlice({ ...testatorFormData, fullAddress: address }));
  };


  return (
    <>
      <Container className="mt-5 mb-4 ps-4 pe-4">
        <Row className="mt-3 mb-4 justify-content-center">
          <Col xs={12} className="mx-auto">
            <h1 className="auth-header">Your details</h1>
          </Col>
        </Row>
        <Row className="mt-3 mb-4 justify-content-center">
          <Col xs={12} md={4} className="mx-auto">
            <Form>
              <Form.Group className="mb-3" controlId="formGroupTitle">
                <Form.Label className="bold-label">Title</Form.Label>
                <Form.Control
                  as="select"
                  name="title"
                  value={testatorFormData.title}
                  onChange={handleOnChange}
                  required
                  className="custom-input"
                >
                  {Object.values(constants.title).map((title, index) => (
                    <option key={index} value={title}>
                      {title}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupFullLegalName">
                <Form.Label className="bold-label">Full legal name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullLegalName"
                  value={testatorFormData.fullLegalName}
                  onChange={handleOnChange}
                  required
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupFullAddress">
                <Form.Label className="bold-label">Full address</Form.Label>
                <AddressAutocomplete
                  name="fullAddress"
                  value={testatorFormData.fullAddress}
                  onPlaceSelected={handlePlaceSelected}
                  handleInputChange={handleOnChange}
                  className="custom-input"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupDob">
                <Form.Label className="bold-label">Date of birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={testatorFormData.dob}
                  onChange={handleOnChange}
                  required
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label className="bold-label">Email (optional)</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={testatorFormData.email}
                  onChange={handleOnChange}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPhone">
                <Form.Label className="bold-label">Phone Number (optional)</Form.Label>
                <Form.Control
                  type="tel"
                  name="tel"
                  value={testatorFormData.tel}
                  onChange={handleOnChange}
                  className="custom-input"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container >
      <Container >
        <CreatingOrderNavigation
          onBack={handleBack}
          onSaveAndContinue={handleSaveAndContinue}
        />
      </Container>
    </>
  );
}


export default Testator;
