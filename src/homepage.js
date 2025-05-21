import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Home = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="home-container">
            <div className="navbar">
                <h1 className="blog-title">Lightning Blog</h1>
                <div className="auth-buttons">
                    <button onClick={() => navigate("/tologin")}>Login</button>
                    <button onClick={() => navigate("/register")}>Register</button>
                </div>
            </div>

            <div className="category-section">
                <div className="category-row">
                    <div className="category" onClick={() => handleNavigate("/travel")}>
                        <img
                            src="/Images/pexels-nubikini-386009.jpg"
                            className="category-img"
                            alt="Travel"
                        />
                        <div className="category-label">Travel</div>
                    </div>
                    <div className="category" onClick={() => handleNavigate("/food")}>
                        <img
                            src="/Images/food.jpg"
                            className="category-img"
                            alt="Food"
                        />
                        <div className="category-label">Food</div>
                    </div>
                </div>
                <div className="category-row">
                    <div className="category" onClick={() => handleNavigate("/movies")}>
                        <img
                            src="/Images/movies.jpg"
                            className="category-img"
                            alt="Movies"
                        />
                        <div className="category-label">Movies</div>
                    </div>
                    <div className="category" onClick={() => handleNavigate("/games")}>
                        <img
                            src="/Images/games.jpeg"
                            className="category-img"
                            alt="Games"
                        />
                        <div className="category-label">Games</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
