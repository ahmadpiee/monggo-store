import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card } from "..";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = ({ style = { textDecoration: "none", color: "black" } }) => {
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
        </Container>
    );
};

export default Product;

const Container = styled.div`
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
