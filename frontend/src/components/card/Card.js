import React from "react";
import styled from "styled-components";
import Rating from "../rating/Rating";

const Card = ({ image, name, rating, numReview, price }) => {
    return (
        <Container>
            <img alt="pic" src={image} />
            <BottomContainer>
                <h1>{name}</h1>
                <Rating rating={rating} numReview={numReview} />
                <h2>{`Rp ${price}`}</h2>
            </BottomContainer>
        </Container>
    );
};

export default Card;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    padding-bottom: 1.5rem;
    @media screen and (max-width: 1300px) {
        width: 300px;
    }
    @media screen and (max-width: 700px) {
        width: 280px;
    }
    @media screen and (max-width: 640px) {
        width: 260px;
    }
    width: 380px;
    -webkit-box-shadow: -1px 1px 20px 0px rgba(0, 0, 0, 0.42);
    box-shadow: -1px 1px 20px 0px rgba(0, 0, 0, 0.42);
    overflow: hidden;
    :hover {
        transform: scale(1.05);
        transition: transform 2s cubic-bezier(0.25, 0.45, 0.45, 0.95);
        padding: 5px;
    }
    transition: all 0.5s ease-in-out;
    img {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        width: 100%;
        margin-bottom: 18px;
    }
    h1 {
        font-size: 20px;
        font-weight: 600;
        text-transform: none;
        margin-bottom: 18px;
    }
`;
const BottomContainer = styled.div`
    padding: 1rem 2rem;
`;
