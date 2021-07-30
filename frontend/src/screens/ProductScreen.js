import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    listProductDetails,
    createProductReview,
} from "../store/actions/productActions";
import * as actions from "../store/actionTypes";
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
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, product, error } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productCreateReview = useSelector(
        (state) => state.productCreateReview
    );
    const { success: successCreateReview, error: errorCreateReview } =
        productCreateReview;

    useEffect(() => {
        if (successCreateReview) {
            alert("Review Submitted");
            setRating(0);
            setComment("");
            dispatch({ type: actions.PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match, successCreateReview]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    const submitHandler = async (e) => {
        await e.preventDefault();
        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        );
    };

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
                <>
                    <Row>
                        <Col md={4}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
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
                                    >
                                        <Text>Reviews</Text>
                                    </Rating>
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
                                                <Col>Quantity</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value
                                                            )
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

                                    {!userLogin.isAdmin && (
                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className="btn-block"
                                                type="button"
                                                disabled={
                                                    product.countInStock === 0
                                                }
                                            >
                                                Add to Cart
                                            </Button>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-5" md={6}>
                            <span>Reviews</span>
                            <HorizontalSeparator style={{ margin: "1rem 0" }} />
                            {product.reviews.length === 0 && (
                                <Message
                                    style={{
                                        background: "#7B8A8B",
                                        borderRadius: "5px",
                                    }}
                                >
                                    <h2>No Reviews</h2>
                                </Message>
                            )}
                            <ListGroup variant="flush">
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <h2>{review.name}</h2>
                                        <Rating rating={review.rating} />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                {errorCreateReview && (
                                    <Message>{errorCreateReview}</Message>
                                )}
                                {userInfo && !userInfo.isAdmin ? (
                                    <Form
                                        className="mt-4"
                                        onSubmit={submitHandler}
                                    >
                                        <Form.Group controlId="rating">
                                            <Form.Label>
                                                <span>Rating</span>
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={rating}
                                                required
                                                onChange={(e) =>
                                                    setRating(e.target.value)
                                                }
                                            >
                                                <option value="">
                                                    Select...
                                                </option>
                                                <option value="1">
                                                    1 - Poor
                                                </option>
                                                <option value="2">
                                                    2 - Fair
                                                </option>
                                                <option value="3">
                                                    3 - Good
                                                </option>
                                                <option value="4">
                                                    4 - Very Good
                                                </option>
                                                <option value="5">
                                                    5 - Excellent
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group
                                            className="mt-2"
                                            controlId="comment"
                                        >
                                            <Form.Label>
                                                <span>Comment</span>
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                row="3"
                                                required
                                                value={comment}
                                                onChange={(e) =>
                                                    setComment(e.target.value)
                                                }
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button
                                            className="mt-2 btn-sm"
                                            type="submit"
                                            variant="success"
                                        >
                                            Submit
                                        </Button>
                                    </Form>
                                ) : (
                                    <Message
                                        style={{
                                            background: "#95A5A6",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <p>
                                            Please click{" "}
                                            <Link
                                                style={{ color: "#69D3BE" }}
                                                to="/login"
                                            >
                                                here
                                            </Link>{" "}
                                            to sign in and write a review
                                        </p>
                                    </Message>
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                </>
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
    span {
        font-size: 18px;
        font-weight: 600;
        color: #666666;
    }
`;

const Text = styled.h1`
    margin: 0 0 0 4px;
    font-size: 12px;
    color: gray;
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
