import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaCartArrowDown, FaUser } from "react-icons/fa";
import { SearchBox } from "..";
import { logout } from "../../store/actions/userActions";
import styled from "styled-components";

const Header = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <NavContainer>
            <Navbar
                bg="dark"
                variant="dark"
                className="NavbarContainer"
                expand="lg"
                collapseOnSelect
            >
                <LinkContainer to="/">
                    <Logo src="https://res.cloudinary.com/tv-masa-kini/image/upload/v1626436785/monggo/logo-monggo1_ccbipn.png" />
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="Nav">
                        <Route
                            render={({ history }) => (
                                <SearchBox history={history} />
                            )}
                        />
                        <LeftMenuContainer>
                            <LinkContainer className="Cart" to="/cart">
                                <Nav.Link>
                                    <span>Cart</span>
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                    className="Profile"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer className="SignIn" to="/login">
                                    <Nav.Link>Sign In</Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </LeftMenuContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </NavContainer>
    );
};

export default Header;

const NavContainer = styled.div`
    .NavbarContainer {
        padding: 10px 0;
        background: rgb(44, 62, 80);
        background: linear-gradient(
            90deg,
            rgba(44, 62, 80, 1) 0%,
            #000c1c 50%,
            rgba(44, 62, 80, 1) 100%
        );
        padding: 0.5rem 2rem;
    }
    .Nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        justify-content: space-between;
    }
    .Cart {
        transition: all 0.5s ease;
        margin: 0 1rem;

        :hover {
            border-radius: 3px;
            background: #c7c7c7;
            color: black;
        }
        span {
            color: white;
        }
    }
    .SignIn {
        transition: all 0.5s ease;
        margin: 0 1rem;
        :hover {
            border-radius: 3px;
            background: #c7c7c7;
            color: black;
        }
    }
    .Profile {
    }
`;
const LeftMenuContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const Logo = styled.img`
    cursor: pointer;
    width: 7rem;
    margin: 5px 1rem 5px 0;
`;
