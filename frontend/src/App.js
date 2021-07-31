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
                    <Route path="/shipping" component={ShippingScreen} />
                    <Route path="/payment" component={PaymentScreen} />
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/profile" component={ProfileScreen} />
                    <Route path="/admin/userlist" component={UserListScreen} />
                    <Route
                        path="/admin/user/:id/edit"
                        component={UserEditScreen}
                    />
                    <Route
                        path="/admin/productlist"
                        component={ProducListScreen}
                    />
                    <Route
                        path="/admin/product/:id/edit"
                        component={ProductEditScreen}
                    />
                    <Route
                        path="/admin/orderlist"
                        component={OrderListScreen}
                    />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                    <Route path="/order/:id" component={OrderScreen} />
                    <Route path="/search/:keyword" component={HomeScreen} />
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
    min-height: 80vh;
    a,
    .Link {
        text-decoration: none;
    }
`;
