import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import App from "../app/App";

describe("App function component", () => {

    it("Renders without errors", () => {
        render(<App />, { wrapper: BrowserRouter });
    }) 
    
})