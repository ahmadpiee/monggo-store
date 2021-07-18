import React from "react";
import styled from "styled-components";
import { Card } from "..";
import { products } from "../../ProductData";
import { Link } from "react-router-dom";

const Product = ({ style = { textDecoration: "none", color: "black" } }) => {
    return (
        <Container>
            {products.map((product) => (
                <Link
                    key={product._id}
                    style={style}
                    to={`/product/${products._id}`}
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
        </Container>
    );
};

export default Product;

const Container = styled.div`
    display: grid;
    grid-gap: 3rem;
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
