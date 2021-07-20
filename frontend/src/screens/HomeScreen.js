import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Banner, Card } from "../components";
import { BodyIntro } from "../components/styles/TextStyle";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeScreen = ({ style = { textDecoration: "none", color: "black" } }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get("/api/products");
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <Container>
            <Banner />
            <Title>Latest Product</Title>
            <ProductContainer>
                <CardContainer>
                    {products.map((product) => (
                        <Link
                            key={product._id}
                            style={style}
                            to={`/product/${product._id}`}
                        >
                            <Card
                                rating={product.rating}
                                key={product._id}
                                product={product}
                                image={product.image}
                                name={product.name}
                                numReview={product.numReviews}
                                price={product.price}
                            />
                        </Link>
                    ))}
                </CardContainer>
            </ProductContainer>
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
const ProductContainer = styled.div``;

const CardContainer = styled.div`
    display: grid;
    grid-gap: 1.5rem;
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
