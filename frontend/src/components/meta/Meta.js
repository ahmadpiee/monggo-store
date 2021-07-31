import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keyword" content={keywords} />
            </Helmet>
        </>
    );
};

Meta.defaultProps = {
    title: "Monggofits | Best Quality",
    description: "we sell the best vans products, best quality vans footwear",
    keywords:
        "vans, vans old skool, vans old skool pro, vans pro, vans era, vans slip, vans shoes,vans authentic",
};

export default Meta;
