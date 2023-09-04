import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NewsItem from "./NewsItem";

function NewsList() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/news/get-list`)
      .then((response) => setNewsList(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/news/delete/${id}`)
      .then(() => {
        const updatedNewsList = newsList.filter((news) => news.id !== id);
        setNewsList(updatedNewsList);
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (id, editedNews) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/news/update/${id}`, editedNews)
      .then(() => {
        const updatedNewsList = newsList.map((news) => {
          if (news.id === id) {
            return { ...news, ...editedNews };
          } else {
            return news;
          }
        });
        setNewsList(updatedNewsList);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1 className="h2 title">Новости</h1>
      <Link to="/create">
        <button className="btn btn-dark">Создать новость</button>
      </Link>
      {newsList.length === 0 ? (
        <div className="news-notification">Здесь пока пусто...</div>
      ) : (
        <div className="news-list">
          {newsList.map((news) => (
            <NewsItem
              key={news.id}
              news={news}
              onDelete={() => handleDelete(news.id)}
              onEdit={(editedNews) => handleEdit(news.id, editedNews)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsList;
