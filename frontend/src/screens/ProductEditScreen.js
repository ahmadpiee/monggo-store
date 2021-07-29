import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    listProductDetails,
    updateProduct,
} from "../store/actions/productActions";
import * as actions from "../store/actionTypes";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { Message, Loader, FormContainer } from "../components";
import { HorizontalSeparator } from "../components/line-separator/LineSeparator";

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, product, error } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdateProduct,
        success: successUpdateProduct,
        error: errorUpdateProduct,
    } = productUpdate;

    useEffect(() => {
        if (successUpdateProduct) {
            dispatch({ type: actions.PRODUCT_UPDATE_RESET });
            history.push("/admin/productlist");
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setBrand(product.brand);
                setImage(product.image);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, productId, product, history, successUpdateProduct]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const { data } = await axios.post("/api/upload", formData, config);

            setImage(data);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: product._id,
                name,
                price,
                brand,
                image,
                category,
                countInStock,
                description,
            })
        );
    };

    return (
        <>
            <Link to="/admin/productlist" className="my-3">
                Go Back
            </Link>
            <HorizontalSeparator style={{ margin: "1rem 0" }} />
            <Container>
                <FormContainer>
                    <h1>Edit Product</h1>
                    {loadingUpdateProduct && <Loader />}
                    {errorUpdateProduct && (
                        <Message>{errorUpdateProduct}</Message>
                    )}
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
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className="mb-3"
                                />
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter price"
                                    value={price}
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="mb-3"
                                />
                            </Form.Group>

                            <Form.Group controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image url"
                                    value={image}
                                    required
                                    onChange={(e) => setImage(e.target.value)}
                                    className="mb-3"
                                />
                                <Form.File
                                    id="image-file"
                                    label="Browse"
                                    custom
                                    onChange={uploadFileHandler}
                                    className="mb-3"
                                />
                                {uploading && <Loader />}
                            </Form.Group>

                            <Form.Group controlId="brand">
                                <Form.Label>brand</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter brand"
                                    value={brand}
                                    required
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="mb-3"
                                />
                            </Form.Group>

                            <Form.Group controlId="countInStock">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter stock"
                                    value={countInStock}
                                    required
                                    onChange={(e) =>
                                        setCountInStock(e.target.value)
                                    }
                                    className="mb-3"
                                />
                            </Form.Group>

                            <Form.Group controlId="category">
                                <Form.Label>category</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="mb-3"
                                />
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter description"
                                    value={description}
                                    required
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
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

export default ProductEditScreen;

const Container = styled.div`
    width: 100%;
    h1 {
        font-weight: 600;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
`;
