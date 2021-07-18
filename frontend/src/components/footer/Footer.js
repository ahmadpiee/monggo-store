import React from "react";
import styled from "styled-components";
import {
    InstagramIcon,
    LinkIcon,
    TwitterIcon,
    WhatsappIcon,
} from "../icon/Icon";
import { Caption } from "../styles/TextStyle";

const Footer = ({ size }) => {
    return (
        <Container>
            <SocialMediaContainer>
                <a
                    href="https://www.instagram.com/samudera_emas/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <InstagramIcon />
                </a>
                <a
                    href="https://twitter.com/ahmadpiee"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <TwitterIcon />
                </a>
                <a
                    href="https://wa.me/6281296089640"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <WhatsappIcon />
                </a>
                <a
                    href="https://ahmadpiee.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkIcon />
                </a>
            </SocialMediaContainer>
            <ul>
                <li>Weekdays: 00.09 - 17.00</li>
                <li>Weekend: 00.09 - 15.00</li>
            </ul>
            <Copyright>&copy; Monggo 2021</Copyright>
        </Container>
    );
};

export default Footer;

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    padding: 1rem 2px;
    background: rgb(218, 218, 218);
    background: linear-gradient(
        90deg,
        rgba(218, 218, 218, 1) 0%,
        rgba(255, 255, 255, 1) 50%,
        rgba(218, 218, 218, 1) 100%
    );
    ul {
        @media screen and (max-width: 468px) {
            font-size: 11px;
            margin-left: 10px;
        }
    }
`;

const SocialMediaContainer = styled.div`
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    @media screen and (max-width: 500px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Copyright = styled(Caption)`
    @media screen and (max-width: 468px) {
        font-size: 14px;
    }
`;
