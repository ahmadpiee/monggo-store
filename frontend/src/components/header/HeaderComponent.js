import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaCartArrowDown } from "react-icons/fa";
import { SearchBox } from "..";
import { logout } from "../../store/actions/userActions";
import styled from "styled-components";

const Header = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo = false } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <NavContainer>
            <Navbar
                className="NavbarContainer navbar navbar-expand-lg navbar-dark bg-primary"
                expand="lg"
                collapseOnSelect
            >
                <LinkContainer to="/">
                    <Logo src="https://res.cloudinary.com/tv-masa-kini/image/upload/v1627727644/monggo/f_a_s_h_i_o_n_a_b_s_o_l_u_t_gzkxam.png" />
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
                            {!userInfo.isAdmin && (
                                <LinkContainer className="Cart" to="/cart">
                                    <Nav.Link>
                                        <FaCartArrowDown />
                                        <span style={{ marginLeft: "5px" }}>
                                            Cart
                                        </span>
                                    </Nav.Link>
                                </LinkContainer>
                            )}
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
                                    <Nav.Link>
                                        <span>Sign In</span>
                                    </Nav.Link>
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
        @media screen and (max-width: 600px) {
            font-size: 14px;
        }
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
    }
    .SignIn {
        transition: all 0.5s ease;
        margin: 0 1rem;
    }
`;
const LeftMenuContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const Logo = styled.img`
    cursor: pointer;
    width: 5rem;
    margin: 5px 1rem 5px 0;
`;
