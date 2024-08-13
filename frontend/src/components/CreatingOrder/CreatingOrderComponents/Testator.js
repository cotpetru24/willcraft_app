import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreatingOrderNavigation from "../CreatigOrderNavigation";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import DateInput from "../../Common/DateInput";
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

  // Use useRef to store the "saved" state
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
        dob: testator.dob || '',
        email: testator.email || '',
        tel: testator.tel || '',
        maritalStatus: testator.maritalStatus || '',
      });

      // Store the initial state as "saved" state if it's not already saved
      if (!savedTestatorData.current) {
        savedTestatorData.current = JSON.parse(JSON.stringify(testator));
      }

    }
  }, [testator]
  );


  const handleBack = () => {
    // Revert to the "saved" state
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

    // Dispatch the change to the Redux store
    dispatch(updateTestatorSlice({ ...testatorFormData, [name]: value }));
  };


  const handlePlaceSelected = (address) => {
    setTestatorFormData((prevData) => ({
      ...prevData,
      fullAddress: address
    }));

    // Dispatch the change to the Redux store
    dispatch(updateTestatorSlice({ ...testatorFormData, fullAddress: address }));
  };


  return (
    <>
      <Container className="mt-5 mb-4">
        <Row className="mt-3 mb-4 justify-content-center">
          <Col xs={12} md={4} className="mx-auto">
            <h1 className="auth-header">Your details</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={4} className="mx-auto">
            <Form>
              <Form.Group className="mb-3" controlId="formGroupTitle">
                <Form.Label className="bold-label">Title</Form.Label>
                <Form.Control
                  as="select"
                  id="title"
                  name="title"
                  value={testatorFormData.title}
                  onChange={handleOnChange}
                  required
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
                  id="fullLegalName"
                  name="fullLegalName"
                  value={testatorFormData.fullLegalName}
                  onChange={handleOnChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupFullAddress">
                <Form.Label className="bold-label">Full address</Form.Label>
                <AddressAutocomplete
                  name="fullAddress"
                  value={testatorFormData.fullAddress}
                  onPlaceSelected={handlePlaceSelected}
                  handleInputChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupDob">
                <Form.Label className="bold-label">Date of birth</Form.Label>
                <Form.Control
                  required
                />
                <DateInput
                  id="dob"
                  name="dob"
                  value={testatorFormData.dob}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label className="bold-label">Email (optional)</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  value={testatorFormData.email}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPhone">
                <Form.Label className="bold-label">Phone Number (optional)</Form.Label>
                <Form.Control
                  type="tel"
                  id="tel"
                  name="tel"
                  value={testatorFormData.tel}
                  onChange={handleOnChange}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container >
      <CreatingOrderNavigation
        onBack={handleBack}
        onSaveAndContinue={handleSaveAndContinue}
      />
    </>

  );
}

export default Testator;
