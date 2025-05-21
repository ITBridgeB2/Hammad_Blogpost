import React, { useState } from 'react';

const EditPost = () => {
  const [title, setTitle] = useState('Sample Post Title');
  const [content, setContent] = useState('This is the full content of the sample post...');
  const [author, setAuthor] = useState('Author');

  const handleUpdate = (e) => {
    e.preventDefault();
    alert('Post updated!');
  };

  return (
    <div className="edit-post-container">
      <h2 className="edit-title">Edit Post</h2>
      <form className="edit-form" onSubmit={handleUpdate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <button type="submit" className="update-btn">Update Post</button>
      </form>
      <a href="/" className="back-link">Back to Post</a>
    </div>
  );
};

export default EditPost;
