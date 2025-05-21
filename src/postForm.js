import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogdetailsservice from './blogdetailsservice';
import { Filter } from 'bad-words';

const PostForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filter = new Filter();
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (filter.isProfane(formData.content)) {
       alert('*CONTENT CONTAINS INAPPROPRIATE LANGUAGE.\nUPLOAD ONLY APPROPRIATE CONTENT.');
       return;
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }

    if (!formData.category === formData.not_selected) {
      newErrors.author = 'Select the category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
          blogdetailsservice.saveBlogDetails(formData)
            .then(() => {
              alert("Blog uploaded suceessfully");
              navigate("/tolist");
            })
            .catch(err => {
              alert("Failed to upload : " + err.message);
            });
        }
      };

  return (
    <div className="form-container">
      <h1>Create A New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">

          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <label htmlFor="category">Category</label>
        <div className="form-group">
        <select
        name="category"
        value={formData.category}
        onChange={handleChange} 
         >
        <option value="not_selected">select</option>
        <option value="travel">Travel</option>
        <option value="movies">Movies</option>
        <option value="games">Games</option>
        <option value="food">Food</option>
        </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter post content"
          />
          {errors.content && <p className="error">{errors.content}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
          {errors.author && <p className="error">{errors.author}</p>}
        </div>
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};

export default PostForm;
