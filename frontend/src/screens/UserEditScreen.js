import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../store/actions/userActions";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { Message, Loader, FormContainer } from "../components";
import { HorizontalSeparator } from "../components/line-separator/LineSeparator";
import * as actions from "../store/actionTypes";

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, user, error } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdateUser,
        success: successUpdateUser,
        error: errorUpdateUser,
    } = userUpdate;

    useEffect(() => {
        if (successUpdateUser) {
            dispatch({ type: actions.USER_UPDATE_RESET });
            history.push("/admin/userlist");
        } else if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, userId, user, successUpdateUser, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    };

    return (
        <>
            <Link to="/admin/userlist" className="my-3">
                Go Back
            </Link>
            <HorizontalSeparator style={{ margin: "1rem 0" }} />
            <Container>
                <FormContainer>
                    <h1>Edit User</h1>
                    {loadingUpdateUser && <Loader />}
                    {errorUpdateUser && <Message>{errorUpdateUser}</Message>}
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message>{error}</Message>
                    ) : (
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

                            <Form.Group controlId="isAdmin">
                                <Form.Check
                                    type="checkbox"
                                    label="As an administrator"
                                    checked={isAdmin}
                                    onChange={(e) =>
                                        setIsAdmin(e.target.checked)
                                    }
                                ></Form.Check>
                            </Form.Group>

                            <Button
                                className="mt-3"
                                type="submit"
                                variant="primary"
                            >
                                Update
                            </Button>
                        </Form>
                    )}
                </FormContainer>
            </Container>
        </>
    );
};

export default UserEditScreen;

const Container = styled.div`
    width: 100%;
    h1 {
        font-weight: 600;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
`;
