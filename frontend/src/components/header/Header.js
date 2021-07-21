import React from "react";
import styled from "styled-components";
import { Caption2 } from "../styles/TextStyle";
import { FaCartArrowDown, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ style }) => {
    return (
        <>
            <Container>
                <Link className="link" style={style} to="/">
                    <Logo src="https://res.cloudinary.com/tv-masa-kini/image/upload/v1626436785/monggo/logo-monggo1_ccbipn.png" />
                </Link>
                <MenuContainer>
                    <Link className="link" style={style} to="/cart">
                        <Title>
                            <FaCartArrowDown
                                style={{
                                    marginRight: "5px",
                                }}
                            />
                            cart
                        </Title>
                    </Link>
                    <Link className="link" style={style} to="/login">
                        <Title>
                            <FaUser /> Sign In
                        </Title>
                    </Link>
                </MenuContainer>
            </Container>
            <SearchField type="search" placeholder="Search items" />
        </>
    );
};

export default Header;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 500px) {
        padding: 1rem 1rem;
    }
    padding: 1rem 3rem;
    color: white;
    -webkit-box-shadow: -1px 1px 20px 0px rgba(0, 0, 0, 0.6);
    background: rgb(44, 62, 80);
    background: linear-gradient(
        90deg,
        rgba(44, 62, 80, 1) 0%,
        #000c1c 50%,
        rgba(44, 62, 80, 1) 100%
    );
    .link {
        text-decoration: none;
        color: white;
    }
`;
const Logo = styled.img`
    cursor: pointer;
    width: 8rem;
    position: static;
    @media screen and (max-width: 468px) {
        width: 6rem;
    }
`;
const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title = styled(Caption2)`
    @media screen and (max-width: 700px) {
        font-size: 14px;
    }
    @media screen and (max-width: 468px) {
        font-size: 12px;
        margin: 0 0 0 0.6rem;
    }
    text-transform: capitalize;
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
    padding: 1rem 4rem;
    border: none;
    font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
    font-size: 16px;
    @media screen and (max-width: 500px) {
        padding: 10px 1rem;
    }
`;
