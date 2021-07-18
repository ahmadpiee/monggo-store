import React from "react";
import styled from "styled-components";

const Banner = ({ style }) => {
    return (
        <BannerContainer style={style}>
            <Image
                alt="banner"
                src="https://cdn.dribbble.com/users/1615584/screenshots/7333506/03_4x.jpg"
            />
        </BannerContainer>
    );
};

export default Banner;

const BannerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5rem 0;
    margin: 0 0 2rem 0;
`;
const Image = styled.img`
    @media screen and (max-width: 840px) {
        height: 500px;
    }
    @media screen and (max-width: 640px) {
        height: 400px;
    }
    @media screen and (max-width: 540px) {
        height: 350px;
    }
    @media screen and (max-width: 450px) {
        height: 200px;
    }
    @media screen and (max-width: 350px) {
        height: 190px;
    }
    height: 600px;
`;
