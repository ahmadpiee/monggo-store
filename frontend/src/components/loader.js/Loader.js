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
                marginTop: "10rem",
                display: "block",
                color: "#2A3C4D",
            }}
        >
            {children}
        </Spinner>
    );
};

export default Loader;
