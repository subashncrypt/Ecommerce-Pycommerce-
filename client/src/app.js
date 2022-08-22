import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/header/header";

import HomePage from "./pages/home-page";
import ErrorPage from "./pages/error-page";
import CartPage from "./pages/cart-page";
import ProductPage from "./pages/product-details-page";
import ProfilePage from "./pages/profile-page";
import Addproduct from "./pages/addproduct";
import Viewproduct from "./pages/viewproduct";
import Addcoupon from "./pages/addcoupon";
import Viewcoupon from "./pages/viewcoupon";
import SellerRegistration from "./components/user-management/seller-registration";
import ManageAddress from "./components/profile/manage-address";
import ProfileInformation from "./components/profile/profile-information";
import ProductsPage from "./pages/products-page";
import useLocalStorage from "./hooks/useLocalStorage";

import "./app.css";
import PaymentPage from "./pages/payment-page";
import Payment from "./components/payment/payment";
import Registration from "./components/user-management/registration";
import Login from "./components/user-management/login";
import ForgotPassword from "./components/user-management/forgot-password";
import OrderConfirmed from "./pages/order-confirm-page";
import OrderHistory from "./pages/order-history";
import DeliveryStatus from "./pages/delivery-status";
import SellerOrderHistory from "./pages/seller-order-history";

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/favorites">
          <ProfilePage />
        </Route>
        <Route exact path="/product/:id">
          <ProductPage />
        </Route>
        <Route exact path="/shipping">
          <PaymentPage />
        </Route>
        <Route exact path="/payment">
          <Payment />
        </Route>
        <Route exact path="/orderConfirmed">
          <OrderConfirmed />
        </Route>
        <Route exact path="/orderHistory">
          <ProfilePage />
        </Route>
        <Route exact path="/deliveryStatus">
          <ProfilePage />
        </Route>
        <Route exact path="/updateDelivery">
          <ProfilePage />
        </Route>
        <Route exact path="/cart">
          <CartPage />
        </Route>
        <Route exact path="/registration">
          <Registration />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <Route exact path="/products/:category">
          <ProductsPage />
        </Route>
        <Route exact path="/add-coupon">
          <Addcoupon />
        </Route>
        <Route exact path="/view-coupon">
          <Viewcoupon />
        </Route>
        <Route exact path="/edit-coupon/:id">
          <Addcoupon />
        </Route>
        <Route exact path="/view-order">
          <SellerOrderHistory />
        </Route>
        {(localStorage.getItem("jwtoken") != null) ?
        <>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/sellerregistration">
            <SellerRegistration />
          </Route>
          <Route exact path="/manageaddress">
            <ManageAddress />
          </Route>
          <Route exact path="/profileinformation">
            <ProfileInformation />
          </Route>
          <Route exact path="/add-product">
            <Addproduct />
          </Route>
          <Route exact path="/view-product">
            <Viewproduct />
          </Route>
          <Route exact path="/edit-product/:id">
            <Addproduct />
          </Route>
        </>
        :
          <Redirect exact path="/login">
            <Login />
          </Redirect>
        }
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
