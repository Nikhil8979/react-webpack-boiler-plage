import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "../pages/Home";
import {About} from "../pages/About";
import ProtectedRoutes from "./PrivateRoute";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoutes/>}>
                    <Route path="/about" element={<About/>}/>
                </Route>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}
