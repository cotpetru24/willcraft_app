import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import KidsCard from "./CreatingOrderCards/KidsCard";
import AssetsCard from "./CreatingOrderCards/AssetsCard";
import AssetsDistributionCard from "./CreatingOrderCards/AssetsDistributionCard";
import ExecutorsCard from "./CreatingOrderCards/ExecutorsCard";
import TestatorCard from "./CreatingOrderCards/TestatorCard";
import SpouseOrPartnerCard from "./CreatingOrderCards/SpouseOrPartnerCard";
import ProgressAndInstructionsCard from "./CreatingOrderCards/ProgressAndInstructionsCard";
import { Container, Row, Col } from "react-bootstrap";
import { updateOrderCurrentStep } from "../../features/orderSteps/orderCurrentStepSlice";
import constants from "../../common/constants";



const CreatingOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentOrder = useSelector(state => state.currentOrder);
    const testator = useSelector(state => state.testator);
    const spouseOrPartner = useSelector(state => state.spouseOrPartner);
    const kids = useSelector(state => state.kids);
    const assets = useSelector(state => state.assets);

    useEffect(() => {
        let currentStep = 0;

        // Check if testator details are complete
        if (
            testator &&
            (
                (testator.title && testator.title !== '') &&
                (testator.fullLegalName && testator.fullLegalName !== '') &&
                (testator.dob && testator.dob !== '') &&
                (testator.fullAddress && testator.fullAddress !== '')
            )
        ) {
            currentStep = 1;
        } else {
            // If testator details are incomplete, set currentStep to 0 and exit early
            dispatch(updateOrderCurrentStep(0));
            return;
        }

        // Check if spouse details are complete (or if marital status allows skipping this step)
        if (
            currentStep === 1 &&
            (testator.maritalStatus === constants.maritalStatus.SINGLE ||
                testator.maritalStatus === constants.maritalStatus.WIDOWED ||
                (
                    spouseOrPartner && (
                        (spouseOrPartner.title && spouseOrPartner.title !== '') &&
                        (spouseOrPartner.fullLegalName && spouseOrPartner.fullLegalName !== '') &&
                        (spouseOrPartner.dob && spouseOrPartner.dob !== '') &&
                        (spouseOrPartner.fullAddress && spouseOrPartner.fullAddress !== '')
                    )
                )
            )
        ) {
            currentStep = 2;
        } else {
            // If spouse details are incomplete, set currentStep to 1 and exit early
            dispatch(updateOrderCurrentStep(1));
            return;
        }

        // Check if kids details are complete (or if testator has no children)
        if (
            currentStep === 2 &&
            (testator.hasChildrenStatus === 'no' ||
                (
                    kids && (
                        kids.length > 0 && kids.every(kid =>
                            (kid.title && kid.title !== '') &&
                            (kid.fullLegalName && kid.fullLegalName !== '') &&
                            (kid.fullAddress && kid.fullAddress !== '') &&
                            (kid.dob && kid.dob !== '')
                        )
                    )
                )
            )
        ) {
            currentStep = 3;
        } else {
            // If kids details are incomplete, set currentStep to 2 and exit early
            dispatch(updateOrderCurrentStep(2));
            return;
        }

        // Check if assets details are complete
        if (
            currentStep === 3 &&
            (assets && assets.length > 0)
        ) {
            currentStep = 4;
        } else {
            // If assets details are incomplete, set currentStep to 3 and exit early
            dispatch(updateOrderCurrentStep(3));
            return;
        }

        // // Check if assets distribution is 100% for each asset
        // if (
        //     currentStep === 4 && (assets && assets.length > 0)
        // ) {
        //     const allAssetsValid = assets.every(asset => {
        //         const totalDistribution = asset.distribution.reduce((sum, dist) => {
        //             return sum + Number(dist.receivingAmount);
        //         }, 0);
        //         return totalDistribution === 100;
        //     });

        //     if (allAssetsValid) {
        //         currentStep = 5;
        //     } else {
        //         // If assets distribution is not valid, set currentStep to 4 and exit early
        //         dispatch(updateOrderCurrentStep(4));
        //         return;
        //     }
        // }
        // Check if assets distribution is 100% for each asset
        if (
            currentStep === 4 && (assets && assets.length > 0)
        ) {
            const allAssetsValid = assets.every(asset => {
                // Check if distribution is an array and exists
                if (Array.isArray(asset.distribution)) {
                    const totalDistribution = asset.distribution.reduce((sum, dist) => {
                        return sum + Number(dist.receivingAmount);
                    }, 0);
                    return totalDistribution === 100;
                } else {
                    // If distribution doesn't exist or isn't an array, consider the asset invalid
                    return false;
                }
            });

            if (allAssetsValid) {
                currentStep = 5;
            } else {
                // If assets distribution is not valid, set currentStep to 4 and exit early
                dispatch(updateOrderCurrentStep(4));
                return;
            }
        }


        // Check if executors are present
        if (
            currentStep === 5 && currentOrder.peopleAndRoles
        ) {
            const executors = currentOrder.peopleAndRoles.filter(person =>
                person.role.includes('executor') || person.role.includes('additional executor')
            );

            if (executors.length > 0) {
                currentStep = 6;
            } else {
                // If executors are not valid, set currentStep to 5 and exit early
                dispatch(updateOrderCurrentStep(5));
                return;
            }
        }

        // Dispatch the current step to the Redux store
        dispatch(updateOrderCurrentStep(currentStep));
    }, [testator, spouseOrPartner, kids, assets, currentOrder, dispatch]);


    // Use the correct slice name here
    const currentStep = useSelector(state => state.currentOrderStep.currentStep);




    return (
        <>
            <Container>
                <Row className="mt-5 mb-4 ps-3 pe-3">
                    <Col>
                        <h1 className="auth-header">My Will</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col xs={{ order: 2 }} md={{ order: 1 }}>
                        <TestatorCard />
                        <SpouseOrPartnerCard />
                        <KidsCard />
                        <AssetsCard />
                        <AssetsDistributionCard />
                        <ExecutorsCard />
                    </Col>
                    <Col xs={{ order: 1 }} md={{ order: 2 }}>
                        <ProgressAndInstructionsCard />
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default CreatingOrder;