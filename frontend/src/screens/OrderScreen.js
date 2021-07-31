import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actionTypes";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";

import { Message, Loader, Formatter } from "../components";
import { HorizontalSeparator } from "../components/line-separator/LineSeparator";
import {
    getOrderDetails,
    payOrder,
    deliverOrder,
} from "../store/actions/orderActions";
import dayjs from "dayjs";

const OrderScreen = ({ match, history }) => {
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();
    const orderId = match.params.id;

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    if (!loading) {
        order.itemsPrice = order.orderItems.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
        );
    }

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get("/api/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay || order._id !== orderId || successDeliver) {
            dispatch({ type: actions.ORDER_PAY_RESET });
            dispatch({ type: actions.ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [
        dispatch,
        orderId,
        successPay,
        order,
        history,
        userInfo,
        successDeliver,
    ]);

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));
    };
    const deliverHandler = () => {
        if (window.confirm("Are you sure this item has been delivered?")) {
            dispatch(deliverOrder(order));
        }
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message>{error}</Message>
    ) : (
        <>
            <h1>
                Order Id:{" "}
                <span style={{ fontWeight: "bold" }}>{order._id}</span>
            </h1>
            <HorizontalSeparator style={{ margin: "10px 0" }} />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h1 className="mb-2 fw-bold">Shipping to:</h1>
                            <p>
                                <span>Name: </span> {order.user.name}
                            </p>
                            <span>Email: </span>
                            <a
                                className=" text-decoration-none"
                                href={`mailto:${order.user.email}`}
                            >
                                {order.user.email}
                            </a>
                            <p className="mt-2">
                                <span className="fw-bold">Addres: </span>
                                {order.shippingAddress.address},{" "}
                                {order.shippingAddress.city},{" "}
                                {order.shippingAddress.postalCode},{" "}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message
                                    style={{
                                        background: "#3CB782",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Delivered on (
                                    {dayjs(order.deliveredAt).toString()})
                                </Message>
                            ) : (
                                <Message style={{ fontWeight: "bold" }}>
                                    Not delivered
                                </Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h1 className="fw-bold">Payment Method: </h1>
                            {order.paymentMethod}
                            {order.isPaid ? (
                                <Message
                                    style={{
                                        background: "#3CB782",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Paid on ({dayjs(order.paidAt).toString()})
                                </Message>
                            ) : (
                                <Message style={{ fontWeight: "bold" }}>
                                    Not paid
                                </Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
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
                                                        {Formatter.format(
                                                            `${item.price}`
                                                        )}{" "}
                                                        ={" "}
                                                        <span className="fw-bold">
                                                            {Formatter.format(
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
                                        {" "}
                                        {Formatter.format(
                                            `${order.itemsPrice}`
                                        )}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping (2-3 days)</Col>
                                    <Col>
                                        {Formatter.format(
                                            `${order.shippingPrice}`
                                        )}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>
                                        {Formatter.format(`${order.taxPrice}`)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>
                                        <h1 className="fw-bold">
                                            {Formatter.format(
                                                `${order.totalPrice}`
                                            )}
                                        </h1>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        !userInfo.isAdmin && (
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={
                                                    successPaymentHandler
                                                }
                                            />
                                        )
                                    )}
                                </ListGroup.Item>
                            )}

                            {loadingDeliver && <Loader />}
                            {userInfo &&
                                userInfo.isAdmin &&
                                order.isPaid &&
                                !order.iseDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type="button"
                                            className="btn btn-block"
                                            onClick={deliverHandler}
                                        >
                                            Mark as Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;
