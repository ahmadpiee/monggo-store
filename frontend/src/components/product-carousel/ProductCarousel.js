import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { Loader, Message } from "..";
import { listTopProducts } from "../../store/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ProductCarousel = () => {
    const dispatch = useDispatch();

    const productTopRated = useSelector((state) => state.productTopRated);
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message>{error}</Message>
    ) : (
        <Container>
            <Carousel
                fade
                controls={false}
                pause="hover"
                interval={4000}
                className="CarouselContainer"
            >
                {products.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link
                            className="ProductContainer"
                            to={`/product/${product._id}`}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                className="Img"
                            />
                            <span>{product.name}</span>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};

export default ProductCarousel;

const Container = styled.div`
    margin-bottom: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .CarouselContainer {
        background: rgb(44, 62, 80);
        background: linear-gradient(
            90deg,
            rgba(44, 62, 80, 1) 0%,
            #000c1c 50%,
            rgba(44, 62, 80, 1) 100%
        );
        display: flex;
        width: 80%;
        color: #fff;
        border-radius: 5px;
    }
    .ProductContainer {
        color: #fff;
        font-weight: 600;
        font-style: oblique;
        text-transform: uppercase;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem;
        @media screen and (max-width: 800px) {
            font-size: 14px;
        }
        @media screen and (max-width: 600px) {
            font-size: 12px;
        }
        .Img {
            border-radius: 50%;
            margin-bottom: 1rem;
            width: 400px;
            @media screen and (max-width: 800px) {
                width: 250px;
                font-size: 12px;
            }
            @media screen and (max-width: 600px) {
                width: 200px;
            }

            transition: all 0.3s ease-in-out;
            :hover {
                transform: scale(1.02);
                transition: transform 1s cubic-bezier(0.25, 0.45, 0.45, 1);
            }
        }
    }
`;
