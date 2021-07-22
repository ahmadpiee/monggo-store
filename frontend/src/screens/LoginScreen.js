import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/userActions";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Message, Loader, FormContainer } from "../components";

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, userInfo, error } = userLogin;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <Container>
            <FormContainer>
                <h1>Sign In</h1>
                {loading && <Loader />}
                {error && <Message>{error}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label className="mt-4">Email Address</Form.Label>
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
                    <Button className="mt-3" type="submit" variant="primary">
                        Sign In
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        Don't have an account?{" "}
                        <Link
                            to={
                                redirect
                                    ? `/register?redirect=${redirect}`
                                    : "/register"
                            }
                        >
                            Register
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        </Container>
    );
};

export default LoginScreen;

const Container = styled.div`
    width: 100%;
    h1 {
        font-weight: 600;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
`;
