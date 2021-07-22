import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserDetails,
    updateUserProfile,
} from "../store/actions/userActions";
import { Form, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Message, Loader } from "../components";

const ProfileScreen = ({ history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, user, error } = userDetails;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else if (!user.name) {
            dispatch(getUserDetails("profile"));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, history, userInfo, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password do not match");
        } else {
            dispatch(
                updateUserProfile({ id: user._id, name, email, password })
            );
        }
    };

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h1>User Profile</h1>
                    {loading && <Loader />}
                    {message && <Message>{message}</Message>}
                    {error && <Message>{error}</Message>}
                    {success && (
                        <Message style={{ background: "#3CB782" }}>
                            Profile updated
                        </Message>
                    )}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label className="mt-4">Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mb-3"
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mb-3"
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group
                            className="mt-4"
                            controlId="confirmPassword"
                        >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Button
                            className="mt-3"
                            type="submit"
                            variant="primary"
                        >
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileScreen;

const Container = styled.div`
    width: 100%;
    h1 {
        font-weight: 600;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
`;
