import React, { useEffect, useState } from "react";
import blogdetailsservice from "./blogdetailsservice";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    blogdetailsservice.getGamesPosts()
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching travel posts:', error);
      });
  }, []);

  return (
    <div>
      <h1>Blogs about Games</h1>
      <button onClick={() => navigate("/")} style={{ marginBottom: "1rem" }}>
        Back to Home
      </button>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <div className="post-card" key={post.id}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <p className="post-meta">
              By: {post.author} | Date: {new Date(post.created_at).toISOString().split('T')[0]}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Games;
