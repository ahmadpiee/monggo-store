import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../store/actions/userActions";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Message, Loader } from "../components";
import { BsFillPersonCheckFill, BsTrash } from "react-icons/bs";
import { FaUserTimes, FaRegEdit } from "react-icons/fa";
import styled from "styled-components";

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, userInfo, successDelete]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure want to delete this user?")) {
            dispatch(deleteUser(id));
        }
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
                                        <BsFillPersonCheckFill
                                            size={20}
                                            color="#3CB782"
                                        />
                                    ) : (
                                        <FaUserTimes
                                            size={20}
                                            color="#ff7f7f"
                                        />
                                    )}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/user/${user._id}/edit`}
                                    >
                                        <Button className="bg-primary btn-sm">
                                            <FaRegEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        className="bg-danger m-2 btn-sm"
                                        onClick={() => deleteHandler(user._id)}
                                        disabled={user.isAdmin}
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
