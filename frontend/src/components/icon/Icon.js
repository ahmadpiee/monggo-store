import React from "react";
import styled from "styled-components";
import {
    FaInstagram,
    FaTwitter,
    FaWhatsapp,
    FaStar,
    FaStarHalf,
    FaRegStar,
    FaLink,
} from "react-icons/fa";

export const InstagramIcon = ({
    style,
    size = 20,
    color = "#B32F84",
    onClick,
}) => (
    <Container style={style}>
        <FaInstagram color={color} size={size} onClick={onClick} />
    </Container>
);
export const LinkIcon = ({ style, size = 20, color = "#6d6d6d", onClick }) => (
    <Container style={style}>
        <FaLink color={color} size={size} onClick={onClick} />
    </Container>
);
export const TwitterIcon = ({
    style,
    size = 20,
    color = "#5DA9DD",
    onClick,
}) => (
    <Container style={style}>
        <FaTwitter color={color} size={size} onClick={onClick} />
    </Container>
);
export const WhatsappIcon = ({
    style,
    size = 20,
    color = "#4AD948",
    onClick,
}) => (
    <Container style={style}>
        <FaWhatsapp color={color} size={size} onClick={onClick} />
    </Container>
);
export const EmptyStar = ({ color = "#ffc800", size = 18 }) => (
    <FaRegStar color={color} size={size} />
);
export const Star = ({ color = "#ffc800", size = 18 }) => (
    <FaStar color={color} size={size} />
);
export const HalfStar = ({ color = "#ffc800", size = 18 }) => (
    <FaStarHalf color={color} size={size} />
);

const Container = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    -webkit-box-shadow: -1px 1px 20px 0px rgba(0, 0, 0, 0.2);
    box-shadow: -1px 1px 20px 0px rgba(0, 0, 0, 0.2);
    transition: all 0.5s ease;
    :hover {
        border-radius: 3px;
        padding: 5px;
        background: #b8b8b8;
    }
`;
