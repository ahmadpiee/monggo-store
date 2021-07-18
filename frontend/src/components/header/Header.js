import React from "react";
import styled from "styled-components";
import { Caption2 } from "../styles/TextStyle";
import { FaCartArrowDown, FaUser } from "react-icons/fa";

const Header = () => {
    return (
        <>
            <Container>
                <a href="/">
                    <Logo src="https://res.cloudinary.com/tv-masa-kini/image/upload/v1626436785/monggo/logo-monggo1_ccbipn.png" />
                </a>
                <MenuContainer>
                    <Title>
                        <FaCartArrowDown style={{ marginRight: "4px" }} />
                        cart
                    </Title>
                    <Title>
                        <FaUser /> Sign In
                    </Title>
                </MenuContainer>
            </Container>
            <SearchField type="search" placeholder="search items" />
        </>
    );
};

export default Header;

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem 1rem 1rem 1rem;
    color: white;
    -webkit-box-shadow: -1px 1px 20px 0px rgba(0, 0, 0, 0.6);
    box-shadow: -1px 1px 20px 0px rgba(0, 0, 0, 0.6);
    background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(69, 69, 69, 1) 50%,
        rgba(0, 0, 0, 1) 100%
    );
`;
const Logo = styled.img`
    cursor: pointer;
    width: 8rem;
    @media screen and (max-width: 468px) {
        width: 6rem;
    }
`;
const MenuContainer = styled.div`
    display: flex;
    align-items: center;
`;
const Title = styled(Caption2)`
    @media screen and (max-width: 700px) {
        font-size: 14px;
    }
    @media screen and (max-width: 468px) {
        font-size: 12px;
    }
    margin: 0 0 0 2rem;
    cursor: pointer;
    transition: all 0.5s ease;
    :hover {
        border-radius: 3px;
        padding: 5px;
        background: #c7c7c7;
        color: black;
    }
`;

const SearchField = styled.input`
    display: flex;
    justify-content: content;
    align-items: center;
    width: 100%;
    background: white;
    padding: 14px;
    border-width: 0.01px;
    font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
    font-size: 16px;
`;
