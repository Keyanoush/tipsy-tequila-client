import React from "react"
import { Route } from "react-router-dom"
import { ProductList } from "./product/ProductList.js"
import { ProductDetail } from "./product/ProductDetail.js"
import { ProductProvider } from "./product/ProductProvider.js"
import { RatingProvider } from "./rating/RatingProvider.js"
import { ReviewProvider } from "./review/ReviewProvider.js"
import { OrderProvider } from "./order/OrderProvider.js"
import { OrderList } from "./order/OrderList.js"
import { ReviewForm } from "./review/ReviewForm.js"
import { RatingForm } from "./rating/RatingForm.js"





export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <ProductProvider>
                <RatingProvider>
                    <ReviewProvider>
                        <OrderProvider>
                            <Route exact path="/">
                                <ProductList />
                            </Route>
                            <Route exact path="/products/detail/:productId(\d+)">
                                <ProductDetail />
                            </Route>
                            <Route exact path="/orders/:orderId(\d+)">
                                <OrderList />
                            </Route>
                            <Route exact path="/reviews/create/:productId(\d+)">
                                <ReviewForm />
                            </Route>
                            <Route exact path="/reviews/edit/:reviewId(\d+)">
                                <ReviewForm />
                            </Route>
                            <Route exact path="/ratings/create/:productId(\d+)">
                                <RatingForm />
                            </Route>
                        </OrderProvider>
                    </ReviewProvider>
                </RatingProvider>
            </ProductProvider>
        </main>
    </>
}