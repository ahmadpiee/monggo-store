import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../store/actions/productActions";
import styled from "styled-components";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Rating, Loader, Message, Formatter } from "../components";
import { HorizontalSeparator } from "../components/line-separator/LineSeparator";

const ProductScreen = ({
    style = { textDecoration: "none" },
    match,
    history,
}) => {
    const [qty, setQty] = useState(1);
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    // global state
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, product, error } = productDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);

    return (
        <Container>
            <Link style={style} to="/">
                <Back>Back</Back>
            </Link>
            <HorizontalSeparator style={{ margin: "1rem 0" }} />

            {loading ? (
                <Loader />
            ) : error ? (
                <Message />
            ) : (
                <Row>
                    <Col md={4}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup>
                            <ListGroup.Item>
                                <Title>{product.name}</Title>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    rating={product.rating}
                                    numReview={product.numReviews}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <CustomText>
                                    {Formatter.format(`${product.price}`)}
                                </CustomText>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <CustomText>Description:</CustomText>
                                {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <CustomText>
                                                {Formatter.format(
                                                    `${product.price}`
                                                )}
                                            </CustomText>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? (
                                                <CustomText>
                                                    Stock Tersedia
                                                </CustomText>
                                            ) : (
                                                <CustomText
                                                    style={{ color: "red" }}
                                                >
                                                    Stock Habis
                                                </CustomText>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) =>
                                                        setQty(e.target.value)
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            product.countInStock
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
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <Button
                                        onClick={addToCartHandler}
                                        className="btn-block"
                                        type="button"
                                        disabled={product.countInStock === 0}
                                    >
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default ProductScreen;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 2rem 0 20rem;
    width: 100%;
`;
const Back = styled.p`
    @media screen and (max-width: 700px) {
        font-size: 14px;
    }
    text-transform: capitalize;
    cursor: pointer;
    transition: all 0.5s ease;
    color: gray;
    :hover {
        color: black;
    }
`;
const CustomText = styled.h1`
    font-weight: bold;
`;
const Title = styled.h1`
    font-size: x-large;
    font-weight: 500;
    height: 140%;
`;
