import "./not-found.css";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {

    return (
        <div className="page-not-found">
            <div className="error-message">
                <h1>Whoops..</h1>
                <p>It looks like the page you are looking for does not exists.
                    Try again from the <Link to="/home" className="homepage-link" >homepage</Link></p>
            </div>

            <div className="error-code">
                <img src="/images/404_light.png" alt="Page not found error image"/>
            </div>
      </div>
    )
}