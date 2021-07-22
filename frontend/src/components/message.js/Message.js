import React from "react";
import styled from "styled-components";

const Message = ({ children }) => {
    return <Container>{children}</Container>;
};

export default Message;

const Container = styled.div`
    display: flex;
    margin-top: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #ff3434;
    padding: 1rem;
    @media screen and (max-width: 600px) {
        min-width: 20vh;
    }
    min-width: 30vh;
    color: white;
`;
