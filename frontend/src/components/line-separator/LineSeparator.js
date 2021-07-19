import React from "react";
import styled from "styled-components";

export const HorizontalSeparator = ({ style }) => {
    return <HSeparator style={style} />;
};

export const VerticalSeparator = ({ style }) => {
    return <VSeparator style={style} />;
};

const HSeparator = styled.div`
    background: #dbdbdb;
    width: 100%;
    height: 1px;
`;
const VSeparator = styled.div`
    background: #dbdbdb;
    width: 1px;
    height: 100%;
`;
