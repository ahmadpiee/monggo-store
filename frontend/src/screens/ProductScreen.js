import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

import { Rating } from "../components";
import { HorizontalSeparator } from "../components/line-separator/LineSeparator";
import axios from "axios";

const ProductScreen = ({
    style = { textDecoration: "none", color: "gray" },
    match,
}) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(
                `/api/products/${match.params.id}`
            );
            setProduct(data);
        };
        fetchProduct();
    }, []);

    return (
        <Container>
            <Link style={style} to="/">
                <BackContainer>
                    <IoMdArrowRoundBack size={18} />
                    <h1>Back</h1>
                </BackContainer>
            </Link>
            <HorizontalSeparator style={{ marginBottom: "1rem" }} />
            <Row>
                <Col md={5}>
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
                        <ListGroup.Item>Rp {product.price}</ListGroup.Item>
                        <ListGroup.Item>
                            <CustomText>Description: </CustomText>
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
                                            Rp {product.price}
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
                            <ListGroup.Item>
                                <Button
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
        </Container>
    );
};

export default ProductScreen;

const Container = styled.div`
    width: 100%;
    margin: 2rem;
`;
const BackContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 70px;
    margin: 0 0 2rem 0;
    transition: all 0.5s ease-in-out;
    :hover {
        color: white;
        background: #2a3c4d;
        /* transform: scale(1.02);
        transition: transform 1.5s cubic-bezier(0.25, 0.45, 0.45, 1); */
    }
`;
const CustomText = styled.h1`
    font-weight: 600;
`;
const Title = styled.h1`
    font-size: x-large;
    font-weight: 500;
    height: 140%;
`;
