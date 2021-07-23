import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Message, CheckoutSteps } from "../components";

const PlaceOrderScreen = () => {
    const cart = useSelector((state) => state.cart);
    const formatter = new Intl.NumberFormat("id-ID");

    // Calculate prices
    cart.itemsPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );
    cart.shippingPrice = 18000;
    cart.taxPrice = Number((0.1 * cart.itemsPrice).toFixed(0));
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = () => {};

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h1 className="mb-2 fw-bold">Shipping</h1>
                            <p>
                                <span className="fw-bold">Addres: </span>
                                {cart.shippingAddress.address},{" "}
                                {cart.shippingAddress.city},{" "}
                                {cart.shippingAddress.postalCode},{" "}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>

                                                <Col>
                                                    <Link
                                                        className="text-decoration-none"
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4}>
                                                    <h2>
                                                        {item.qty} x{" "}
                                                        {formatter.format(
                                                            `${item.price}`
                                                        )}{" "}
                                                        ={" "}
                                                        <span className="fw-bold">
                                                            Rp{" "}
                                                            {formatter.format(
                                                                `${
                                                                    item.qty *
                                                                    item.price
                                                                }`
                                                            )}
                                                        </span>
                                                    </h2>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2 className="fw-bolder">Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>
                                        Rp{" "}
                                        {formatter.format(`${cart.itemsPrice}`)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping (2-3 days)</Col>
                                    <Col>
                                        Rp{" "}
                                        {formatter.format(
                                            `${cart.shippingPrice}`
                                        )}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>
                                        Rp{" "}
                                        {formatter.format(`${cart.taxPrice}`)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>
                                        <h1 className="fw-bold">
                                            Rp{" "}
                                            {formatter.format(
                                                `${cart.totalPrice}`
                                            )}
                                        </h1>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
