import React from "react";
import styled from "styled-components";
import { EmptyStar, HalfStar, Star } from "../icon/Icon";

const Rating = ({ rating, numReview, text, children }) => {
    return (
        <StarContainer>
            <span>
                {rating >= 1 ? (
                    <Star />
                ) : rating >= 0.5 ? (
                    <HalfStar />
                ) : (
                    <EmptyStar />
                )}
            </span>
            <span>
                {rating >= 2 ? (
                    <Star />
                ) : rating >= 1.5 ? (
                    <HalfStar />
                ) : (
                    <EmptyStar />
                )}
            </span>
            <span>
                {rating >= 3 ? (
                    <Star />
                ) : rating >= 2.5 ? (
                    <HalfStar />
                ) : (
                    <EmptyStar />
                )}
            </span>
            <span>
                {rating >= 4 ? (
                    <Star />
                ) : rating >= 3.5 ? (
                    <HalfStar />
                ) : (
                    <EmptyStar />
                )}
            </span>
            <span>
                {rating >= 5 ? (
                    <Star />
                ) : rating >= 4.5 ? (
                    <HalfStar />
                ) : (
                    <EmptyStar />
                )}
            </span>
            <h2>{numReview}</h2>
            {children}
        </StarContainer>
    );
};

export default Rating;

const StarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    display: flex;
    width: 100%;
    h2 {
        margin: 0 0 0 10px;
        font-size: 12px;
        color: gray;
    }
    span {
        margin: 0 2px 0 0;
    }
`;
