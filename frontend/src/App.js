import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import { Header, Footer, Layout } from "./components";
import {
    CartScreen,
    LoginScreen,
    HomeScreen,
    ProductScreen,
    RegisterScreen,
} from "./screens";

function App() {
    return (
        <Router>
            <Layout>
                <Header />
                <BodyContainer>
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
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
    padding: 2.5rem;
    min-height: 80vh;
`;
