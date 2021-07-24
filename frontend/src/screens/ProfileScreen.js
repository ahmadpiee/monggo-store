import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserDetails,
    updateUserProfile,
} from "../store/actions/userActions";
import { getMyOrderList } from "../store/actions/orderActions";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import styled from "styled-components";
import { Message, Loader } from "../components";
import { IoCloseSharp } from "react-icons/io5";
import { LinkContainer } from "react-router-bootstrap";

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

    const myOrderList = useSelector((state) => state.myOrderList);
    const {
        loading: loadingMyOrderList,
        orders,
        error: errorMyOrderList,
    } = myOrderList;

    const formatter = new Intl.NumberFormat("id-ID");

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else if (!user.name) {
            dispatch(getUserDetails("profile"));
            dispatch(getMyOrderList());
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
                    <h2 className="fw-bold">My Orders</h2>
                    {loadingMyOrderList ? (
                        <Loader />
                    ) : errorMyOrderList ? (
                        <Message>{errorMyOrderList}</Message>
                    ) : (
                        <Table
                            striped
                            bordered
                            hover
                            responsive
                            className="table-sm"
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>
                                            {order.createdAt.substring(0, 10)}
                                        </td>
                                        <td>
                                            Rp{" "}
                                            {formatter.format(
                                                `${order.totalPrice}`
                                            )}
                                        </td>
                                        <td>
                                            {order.isPaid ? (
                                                order.paidAt.substring(0, 10)
                                            ) : (
                                                <IoCloseSharp color="red" />
                                            )}
                                        </td>
                                        <td>
                                            {order.isDelivered ? (
                                                order.deliveredAt.substring(
                                                    0,
                                                    10
                                                )
                                            ) : (
                                                <IoCloseSharp color="red" />
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer
                                                to={`/order/${order._id}`}
                                            >
                                                <Button className="btn-success btn-sm">
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
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
