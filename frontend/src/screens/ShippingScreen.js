import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../store/actions/cartActions";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { Message, Loader, FormContainer } from "../components";

const ShippingScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push("/payment");
    };

    return (
        <Container>
            <FormContainer>
                <h1>Shipping</h1>
                <Form onSubmit={submitHandler}></Form>
                <Form.Group controlId="address">
                    <Form.Label className="mt-2">Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                        className="mb-2"
                    />
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label className="mt-2">City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                        className="mb-2"
                    />
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label className="mt-2">Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter postalCode"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="mb-2"
                    />
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label className="mt-2">Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                        className="mb-2"
                    />
                </Form.Group>

                <Button
                    onClick={submitHandler}
                    className="mt-2"
                    type="submit"
                    variant="primary"
                >
                    Continue
                </Button>
            </FormContainer>
        </Container>
    );
};

export default ShippingScreen;

const Container = styled.div`
    width: 100%;
    h1 {
        font-weight: 600;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
`;
