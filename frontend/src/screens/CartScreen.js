import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
import styled from "styled-components";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from "react-bootstrap";
import { Message, Formatter } from "../components";
import { FaTrashAlt, FaCartArrowDown } from "react-icons/fa";

const CartScreen = ({
    style = { textDecoration: "none", color: "#233140" },
    match,
    location,
    history,
}) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };
    const checkOutHandler = () => {
        history.push("/login?redirect=shipping");
    };

    return (
        <Container>
            <Title>
                <FaCartArrowDown /> Shopping Cart
            </Title>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <Message style={{ background: "#3CB782" }}>
                            <CustomText>Your cart is empty</CustomText>
                            <Link style={style} to="/">
                                <Back>Go Back</Back>
                            </Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <Link
                                                style={style}
                                                to={`/product/${item.product}`}
                                            >
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>
                                            <Price>
                                                {Formatter.format(
                                                    `${item.price}`
                                                )}
                                            </Price>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(
                                                            item.product,
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    )
                                                }
                                            >
                                                {[
                                                    ...Array(
                                                        item.countInStock
                                                    ).keys(),
                                                ].map((x) => (
                                                    <option
                                                        key={x + 1}
                                                        value={x + 1}
                                                    >
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    removeFromCartHandler(
                                                        item.product
                                                    )
                                                }
                                            >
                                                <FaTrashAlt />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <CartText>
                                    Total Items (
                                    {cartItems.reduce(
                                        (accumulator, item) =>
                                            accumulator + item.qty,
                                        0
                                    )}
                                    )
                                </CartText>
                                <TotalPrice>
                                    {Formatter.format(
                                        `${cartItems.reduce(
                                            (accumulator, item) =>
                                                accumulator +
                                                item.qty * item.price,
                                            0
                                        )}`
                                    )}
                                </TotalPrice>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={checkOutHandler}
                                >
                                    Proceed to Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CartScreen;

const Container = styled.div`
    min-height: 100vh;
    padding: 2rem;
`;
const Title = styled.h1`
    font-weight: 600;
    font-size: 36px;
    margin-bottom: 2rem;
    @media screen and (max-width: 600px) {
        font-size: 20px;
    }
`;

const CustomText = styled.h1`
    color: #ffffff;
`;
const CartText = styled.h1`
    color: #000c1c;
    font-weight: 600;
    font-size: 20px;
    @media screen and (max-width: 600px) {
        font-size: 16px;
    }
`;

const Back = styled.h1`
    margin-top: 5px;
    transition: all 0.5s ease-in-out;
    color: #233140;
    :hover {
        color: white;
    }
`;

const Price = styled.h1`
    font-weight: 600;
`;
const TotalPrice = styled.h1`
    font-weight: bold;
    color: #e45300;
    font-size: 18px;
`;
