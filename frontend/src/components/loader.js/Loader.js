import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ children }) => {
    return (
        <Spinner
            animation="border"
            role="status"
            style={{
                width: "100px",
                height: "100px",
                margin: "auto",
                display: "block",
            }}
        >
            {children}
        </Spinner>
    );
};

export default Loader;
