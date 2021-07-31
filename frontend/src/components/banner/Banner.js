import React from "react";
import styled from "styled-components";

const Banner = ({ style }) => {
    return (
        <BannerContainer style={style}>
            <Image
                alt="banner"
                src="https://res.cloudinary.com/tv-masa-kini/image/upload/v1627762923/monggo/vansBanner3_hl2g9c.gif"
            />
        </BannerContainer>
    );
};

export default Banner;

const BannerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 5rem 0;
`;
const Image = styled.img`
    width: 35%;
`;
