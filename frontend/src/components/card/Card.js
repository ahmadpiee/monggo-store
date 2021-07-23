import React from "react";
import styled from "styled-components";
import Rating from "../rating/Rating";
import { Link } from "react-router-dom";

const Card = ({
    product,
    image,
    name,
    rating,
    numReview,
    price,
    style = { textDecoration: "none", color: "black" },
}) => {
    const formatter = new Intl.NumberFormat("id-ID");

    return (
        <Link key={product._id} style={style} to={`/product/${product._id}`}>
            <Container>
                <img alt="pic" src={image} />
                <BottomContainer>
                    <Title>{name}</Title>
                    <Rating rating={rating} numReview={numReview} />
                    <Price>Rp {formatter.format(`${price}`)}</Price>
                </BottomContainer>
            </Container>
        </Link>
    );
};

export default Card;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    padding-bottom: 1.5rem;
    margin-bottom: 3rem;
    @media screen and (max-width: 1327px) {
        width: 380px;
    }
    @media screen and (max-width: 1275px) {
        width: 350px;
    }
    @media screen and (max-width: 1188px) {
        width: 320px;
    }
    @media screen and (max-width: 1100px) {
        width: 400px;
    }
    @media screen and (max-width: 910px) {
        width: 360px;
    }
    @media screen and (max-width: 820px) {
        width: 340px;
        margin-bottom: 2rem;
    }
    @media screen and (max-width: 786px) {
        width: 320px;
    }
    @media screen and (max-width: 746px) {
        width: 300px;
    }
    @media screen and (max-width: 700px) {
        width: 280px;
    }
    @media screen and (max-width: 640px) {
        width: 260px;
    }
    @media screen and (max-width: 624px) {
        width: 240px;
    }
    @media screen and (max-width: 600px) {
        width: 390px;
    }
    @media screen and (max-width: 468px) {
        width: 290px;
    }
    @media screen and (max-width: 458px) {
        width: 360px;
    }
    @media screen and (max-width: 438px) {
        width: 300px;
    }
    @media screen and (max-width: 368px) {
        width: 280px;
    }
    width: 400px;
    -webkit-box-shadow: -1px 1px 20px 0px rgba(0, 0, 0, 0.42);
    box-shadow: -1px 1px 20px 0px rgba(0, 0, 0, 0.42);
    overflow: hidden;
    img {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        :hover {
            transform: scale(1.06);
            transition: transform 2s cubic-bezier(0.25, 0.45, 0.45, 1);
        }
        transition: all 0.5s ease-in-out;
    }
`;
const Title = styled.h1`
    @media screen and (max-width: 600px) {
        font-size: 18px;
    }
    @media screen and (max-width: 1100px) {
        font-size: 20px;
    }
    font-size: 24px;
    font-weight: 600;
    text-transform: none;
    margin: 10px 0;
`;

const BottomContainer = styled.div`
    padding: 1rem 2rem;
`;
const Price = styled.h1`
    @media screen and (max-width: 600px) {
        font-size: 16px;
    }
    @media screen and (max-width: 1100px) {
        font-size: 18px;
    }
    font-size: 20px;
    margin-top: 15px;
    font-weight: 600;
    color: #263545;
`;
