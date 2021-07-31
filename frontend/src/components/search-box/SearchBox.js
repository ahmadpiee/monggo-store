import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
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
                    placeholder="Search items"
                    onChange={(e) => setKeyword(e.target.value)}
                ></Form.Control>
                <Button
                    type="submit"
                    variant="success"
                    className="button btn-sm"
                >
                    Search
                </Button>
            </Container>
        </Form>
    );
};

export default SearchBox;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    .search {
        border-radius: 0;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .button {
        border-radius: 0;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
`;
