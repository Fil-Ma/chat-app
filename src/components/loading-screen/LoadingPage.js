import "./loading-page.css";
import React from "react";

export default function LoadingPage() {
    return (
        <div className="loading-page">
            <div className="loader-container">
                <span className="loader"></span>
            </div>
        </div>
    )
}