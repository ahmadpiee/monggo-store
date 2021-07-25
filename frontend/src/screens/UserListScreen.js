import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../store/actions/userActions";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Message, Loader } from "../components";
import { BsFillPersonCheckFill, BsTrash } from "react-icons/bs";
import { FaUserTimes, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, userInfo]);

    const deleteHandler = (id) => {
        console.log("delete");
    };

    return (
        <Container>
            <h1>Users list</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <BsFillPersonCheckFill color="#3CB782" />
                                    ) : (
                                        <FaUserTimes color="#ff7f7f" />
                                    )}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/user/${user._id}/edit`}
                                    >
                                        <Button className="bg-dark">
                                            <FaRegEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        className="bg-dark m-2"
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <BsTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default UserListScreen;

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
`;
