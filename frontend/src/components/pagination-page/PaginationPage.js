import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginationPage = ({
    pages,
    page,
    isAdmin = false,
    keyword = "",
    className,
}) => {
    return (
        pages > 1 && (
            <Pagination className={className}>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={
                            !isAdmin
                                ? keyword
                                    ? `/search/${keyword}/page/${x + 1}`
                                    : `/page/${x + 1}`
                                : `/admin/productlist/${x + 1}`
                        }
                    >
                        <Pagination.Item active={x + 1 === page}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
};

export default PaginationPage;
