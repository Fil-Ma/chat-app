import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import App from "../app/App";
import Login from "../components/login/Login";

import LanguageContext from "../languages";

describe("App function component", () => {

    it("renders without errors", () => {
        render(<App />, { wrapper: BrowserRouter });
    }) 
    
})