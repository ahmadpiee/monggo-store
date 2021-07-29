import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    listProducts,
    deleteProduct,
    createProduct,
} from "../store/actions/productActions";
import * as actions from "../store/actionTypes";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Message, Loader } from "../components";
import { BiListPlus } from "react-icons/bi";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { HorizontalSeparator } from "../components/line-separator/LineSeparator";
import styled from "styled-components";

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreateProduct,
        error: errorCreateProduct,
        success: successCreateProduct,
        product: productCreated,
    } = productCreate;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDeleteProduct,
        error: erroDeleteProduct,
        success: successDeleteProduct,
    } = productDelete;

    useEffect(() => {
        dispatch({ type: actions.PRODUCT_DELETE_RESET });
        if (successCreateProduct) {
            dispatch({ type: actions.PRODUCT_CREATE_RESET });
            history.push(`/admin/product/${productCreated._id}/edit`);
        } else {
            dispatch(listProducts());
        }
        if (!userInfo || !userInfo.isAdmin) {
            history.push("/login");
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDeleteProduct,
        successCreateProduct,
        productCreated,
    ]);

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <Container>
            <RowContainer>
                <div>
                    <h1>Products</h1>
                </div>
                <div>
                    <Button className="my-3" onClick={createProductHandler}>
                        <BiListPlus size={22} /> Create Product
                    </Button>
                </div>
            </RowContainer>
            <HorizontalSeparator style={{ margin: "1rem 0" }} />
            {loadingDeleteProduct && <Loader />}
            {erroDeleteProduct && <Message>{erroDeleteProduct}</Message>}
            {loadingCreateProduct && <Loader />}
            {errorCreateProduct && <Message>{errorCreateProduct}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>PRODUCT NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{formatter.format(`${product.price}`)}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/product/${product._id}/edit`}
                                    >
                                        <Button className="bg-primary btn-sm">
                                            <FaRegEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        className="bg-danger m-2 btn-sm"
                                        onClick={() =>
                                            deleteHandler(product._id)
                                        }
                                    >
                                        <FaRegTrashAlt />
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

export default ProductListScreen;

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
const RowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
