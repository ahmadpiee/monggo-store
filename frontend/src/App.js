import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import { Footer, Layout, HeaderComponent } from "./components";
import {
    CartScreen,
    LoginScreen,
    HomeScreen,
    ProductScreen,
    RegisterScreen,
    ProfileScreen,
    ShippingScreen,
    PaymentScreen,
    PlaceOrderScreen,
    OrderScreen,
    UserListScreen,
    UserEditScreen,
    ProducListScreen,
    ProductEditScreen,
    OrderListScreen,
} from "./screens";

function App() {
    return (
        <Router>
            <Layout>
                <HeaderComponent />
                <BodyContainer>
                    <Route path="/shipping" component={ShippingScreen} exact />
                    <Route path="/payment" component={PaymentScreen} exact />
                    <Route path="/login" component={LoginScreen} exact />
                    <Route path="/register" component={RegisterScreen} exact />
                    <Route path="/profile" component={ProfileScreen} exact />
                    <Route
                        path="/admin/userlist"
                        component={UserListScreen}
                        exact
                    />
                    <Route
                        path="/admin/user/:id/edit"
                        component={UserEditScreen}
                        exact
                    />
                    <Route
                        path="/admin/productlist"
                        component={ProducListScreen}
                        exact
                    />
                    <Route
                        path="/admin/productlist/:pageNumber"
                        component={ProducListScreen}
                        exact
                    />
                    <Route
                        path="/admin/product/:id/edit"
                        component={ProductEditScreen}
                        exact
                    />
                    <Route
                        path="/admin/orderlist"
                        component={OrderListScreen}
                        exact
                    />
                    <Route
                        path="/product/:id"
                        component={ProductScreen}
                        exact
                    />
                    <Route path="/cart/:id?" component={CartScreen} exact />
                    <Route
                        path="/placeorder"
                        component={PlaceOrderScreen}
                        exact
                    />
                    <Route path="/order/:id" component={OrderScreen} exact />
                    <Route
                        path="/search/:keyword"
                        component={HomeScreen}
                        exact
                    />
                    <Route
                        path="/search/:keyword/page/:pageNumber"
                        component={HomeScreen}
                        exact
                    />
                    <Route
                        path="/page/:pageNumber"
                        component={HomeScreen}
                        exact
                    />
                    <Route path="/" component={HomeScreen} exact />
                </BodyContainer>
                <Footer />
            </Layout>
        </Router>
    );
}

export default App;

const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 4rem;
    @media screen and (max-width: 500px) {
        padding: 2rem;
    }
    min-height: 85vh;
    a,
    .Link {
        text-decoration: none;
    }
`;
