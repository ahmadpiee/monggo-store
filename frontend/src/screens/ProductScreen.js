import React from "react";
import styled from "styled-components";

const ProductScreen = () => {
    return (
        <Container>
            <h1>this is product</h1>
        </Container>
    );
};

export default ProductScreen;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    margin: 5rem 0 5rem 0;
`;
