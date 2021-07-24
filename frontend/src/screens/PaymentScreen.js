import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../store/actions/cartActions";
import { FormContainer, CheckoutSteps } from "../components";
import styled from "styled-components";

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push("/shipping");
    }

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/placeorder");
    };

    return (
        <Container>
            <FormContainer>
                <CheckoutSteps step1 step2 step3 />
                <h1 className="fw-bolder">Payment Method</h1>
                <Form.Group>
                    <Col>
                        <Form.Check
                            className="mt-4"
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="Paypal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        {/* <Form.Check
                            className="mt-2"
                            type="radio"
                            label="Stripe or Credit Card"
                            id="Stripe"
                            name="paymentMethod"
                            value="Stripe"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check> */}
                    </Col>
                </Form.Group>

                <Button
                    onClick={submitHandler}
                    className="mt-4"
                    type="submit"
                    variant="primary"
                >
                    Continue
                </Button>
            </FormContainer>
        </Container>
    );
};

export default PaymentScreen;

const Container = styled.div`
    width: 100%;
    h1 {
        font-weight: 600;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
`;
