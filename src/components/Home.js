import React from "react";

export default function Home({ 
    userName, 
    handleLogout,
    handleClickJoin 
}) {

    return (
        <div className="home-container">
            <header>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <main>
                <div className="welcome">
                    <h2>Welcome {userName}! Get ready to chat with new and old friends</h2>
                </div>
                <div className="utilities">
                    <button 
                        onClick={() => console.log("hi")}
                    >Start new chatroom</button>
                    <button
                        onClick={handleClickJoin}
                    >Enter existing chatroom</button>
                </div>
            </main>
        </div>
    )
}