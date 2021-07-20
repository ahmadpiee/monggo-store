import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/actions/productActions";
import { Banner, Card, Loader, Message } from "../components";
import { BodyIntro } from "../components/styles/TextStyle";

const HomeScreen = () => {
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <Container>
            <Banner />
            <Title>Latest Product</Title>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <CardContainer>
                    {products.map((product) => (
                        <Card
                            rating={product.rating}
                            key={product._id}
                            product={product}
                            image={product.image}
                            name={product.name}
                            numReview={product.numReviews}
                            price={product.price}
                        />
                    ))}
                </CardContainer>
            )}
        </Container>
    );
};

export default HomeScreen;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 0 0 5rem 0;
`;

const Title = styled(BodyIntro)`
    @media screen and (max-width: 468px) {
        font-size: 20px;
    }
    text-transform: uppercase;
    margin-bottom: 2rem;
`;

const CardContainer = styled.div`
    display: grid;
    /* grid-gap: 1.5rem; */
    grid-template-columns: 1fr 1fr 1fr 1fr;
    @media screen and (max-width: 1680px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media screen and (max-width: 1100px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;
