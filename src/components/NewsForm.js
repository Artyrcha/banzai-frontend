import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewsForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    text: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/news/create`, formData)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1 className="h2 title">Создать новость</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Заголовок:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Текст новости:</label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Создать новость
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewsForm;
