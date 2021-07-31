import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push("/");
        }
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <Container>
                <Form.Control
                    className="search"
                    type="text"
                    name="q"
                    placeholder="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                ></Form.Control>
            </Container>
        </Form>
    );
};

export default SearchBox;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    width: 70%;
    .search {
        border-radius: 2px;
    }
`;
