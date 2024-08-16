import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import KidsCard from "./CreatingOrderCards/KidsCard";
import AssetsCard from "./CreatingOrderCards/AssetsCard";
import AssetsDistributionCard from "./CreatingOrderCards/AssetsDistributionCard";
import ExecutorsCard from "./CreatingOrderCards/ExecutorsCard";
import TestatorCard from "./CreatingOrderCards/TestatorCard";
import SpouseOrPartnerCard from "./CreatingOrderCards/SpouseOrPartnerCard";
import ProgressAndInstructionsCard from "./CreatingOrderCards/ProgressAndInstructionsCard";
import { Container, Row, Col } from "react-bootstrap";



const CreatingOrder = () => {



    const navigate = useNavigate();


    return (
        <>
            <Container>
                <Row className="mt-4 mb-4 ps-3 pe-3">
                    <Col>
                        <h1 className="auth-header">My Will</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col xs={{ order: 2 }} md={{order: 1}}>
                        <TestatorCard />
                        <SpouseOrPartnerCard />
                        <KidsCard />
                        <AssetsCard />
                        <AssetsDistributionCard />
                        <ExecutorsCard />
                    </Col>
                    <Col xs={{ order: 1 }} md={{order:2}}>
                        <ProgressAndInstructionsCard />
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default CreatingOrder;