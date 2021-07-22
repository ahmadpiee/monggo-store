import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/actions/userActions";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Message, Loader, FormContainer } from "../components";

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, userInfo, error } = userRegister;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password do not match");
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <Container>
            <FormContainer>
                <h1>Sign up</h1>
                {loading && <Loader />}
                {message && <Message>{message}</Message>}
                {error && <Message>{error}</Message>}
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
                    <Form.Group className="mt-4" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button className="mt-3" type="submit" variant="primary">
                        Register
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        Already have an account?{" "}
                        <Link
                            to={
                                redirect
                                    ? `/login?redirect=${redirect}`
                                    : "/login"
                            }
                        >
                            Login here
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        </Container>
    );
};

export default RegisterScreen;

const Container = styled.div`
    width: 100%;
    h1 {
        font-weight: 600;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
`;
