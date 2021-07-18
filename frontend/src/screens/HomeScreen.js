import React from "react";
import styled from "styled-components";
import { Product, Banner } from "../components";
import { BodyIntro } from "../components/styles/TextStyle";

const HomeScreen = () => {
    return (
        <Container>
            <Banner />
            <Title>Latest Product</Title>
            <ProductContainer>
                <Product />
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
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 2rem;
`;
const ProductContainer = styled.div``;
