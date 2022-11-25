import React from "react";

export default function Home({ userName }) {

    return (
        <div className="home-container">
            <div className="welcome">
                <h2>Welcome ${userName}! Get ready to chat with new and old friends</h2>
            </div>
            <div className="utilities">
                <button>Start new chatroom</button>
                <button>Enter existing chatroom</button>
            </div>
        </div>
    )
}