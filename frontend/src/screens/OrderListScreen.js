import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../store/actions/orderActions";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Message, Loader } from "../components";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { HorizontalSeparator } from "../components/line-separator/LineSeparator";

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getOrderList());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, userInfo]);

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <Container>
            <h1>Customer's Order List</h1>
            <HorizontalSeparator style={{ margin: "1rem 0" }} />
            {loading ? (
                <Loader />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
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
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>
                                    {formatter.format(`${order.totalPrice}`)}
                                </td>
                                <td>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <FaTimes size={20} color="#ff7f7f" />
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <FaTimes size={20} color="#ff7f7f" />
                                    )}
                                </td>

                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className="bg-primary btn-sm">
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default OrderListScreen;

const Container = styled.div`
    width: 100%;
    h1 {
        font-weight: bold;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
    a {
        text-decoration: none;
    }
    th {
        font-weight: bold;
        color: #3cb782;
    }
`;
