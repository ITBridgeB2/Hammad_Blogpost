import React, { useEffect, useState } from 'react';
import blogdetailsservice from './blogdetailsservice';
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [editPostId, setEditPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    content: '',
    author: '',
    category:'',
  });

  useEffect(() => {
    blogdetailsservice.getPosts()
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      blogdetailsservice.deletePost(id)
        .then(() => {
          setPosts(posts.filter(post => post.id !== id));
        })
        .catch(error => {
          console.error('Error deleting post:', error);
        });
    }
  };

  const handleEditClick = (post) => {
    setEditPostId(post.id);
    setEditFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      category: post.category,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditSave = (id) => {
    blogdetailsservice.updatePost(id, editFormData)
      .then(() => {
        setPosts(posts.map(post => post.id === id ? { ...post, ...editFormData } : post));
        setEditPostId(null);
      })
      .catch(error => {
        console.error('Error updating post:', error);
      });
  };

  return (
    <div className="post-list-container">
      <h1 className="post-list-title">Blog Posts</h1>
      <div className="auth-buttons">
        <button onClick={() => navigate("/dash")}>Create a new blog</button>
      <button onClick={() => navigate("/")}>Logout</button>
      </div>
      <div><h2>MY BLOGS</h2></div>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <div className="post-card" key={post.id}>
            {editPostId === post.id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  placeholder="Title"
                />

<select
        name="category"
        value={editFormData.category}
        onChange={handleEditChange}
        placeholder="Category"
      >
        <option value="not_selected">select</option>
        <option value="travel">Travel</option>
        <option value="movies">Movies</option>
        <option value="games">Games</option>
        <option value="food">Food</option>
      </select>
      
                <textarea
                  name="content"
                  value={editFormData.content}
                  onChange={handleEditChange}
                  placeholder="Content"
                />
                <input
                  type="text"
                  name="author"
                  value={editFormData.author}
                  onChange={handleEditChange}
                  placeholder="Author"
                />
                <div className="post-actions">
                  <button onClick={() => handleEditSave(post.id)} className="save-btn">Save</button>
                  <button onClick={() => setEditPostId(null)} className="cancel-btn">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-category">{post.category}</p>
                <p className="post-content">{post.content}</p>
                <p className="post-meta">
                  By: {post.author} | Date: {new Date(post.created_at).toISOString().split('T')[0]}
                </p>
                <div className="post-actions">
                  <button className="edit-btn" onClick={() => handleEditClick(post)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
