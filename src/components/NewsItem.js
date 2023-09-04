import React, { useState } from "react";

function NewsItem({ news, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNews, setEditedNews] = useState({
    title: news.title,
    description: news.description,
    text: news.text,
  });

  const handleEditStart = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      handleUpdate();
    }
  };

  const handleUpdate = () => {
    onEdit(editedNews);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить эту новость?")) {
      onDelete();
    }
  };

  const countLines = (text) => {
    const lines = text.split("\n");
    return lines.length;
  };

  // Определение, больше ли текст 3 строки
  const isTextLong = countLines(news.text) > 3;

  console.log(isTextLong);

  return (
    <div className="news-item">
      <div className="news-item__ceil _title">
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={editedNews.title}
            onChange={(e) =>
              setEditedNews({ ...editedNews, title: e.target.value })
            }
            className="form-control"
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: news.title }} />
        )}
      </div>
      <div className="news-item__ceil _description">
        {isEditing ? (
          <input
            type="text"
            name="description"
            value={editedNews.description}
            onChange={(e) =>
              setEditedNews({ ...editedNews, description: e.target.value })
            }
            className="form-control"
          />
        ) : (
          <div
            className="line-clamp"
            dangerouslySetInnerHTML={{ __html: news.description }}
          />
        )}
      </div>
      <div className="news-item__ceil _text">
        {isEditing ? (
          <textarea
            name="text"
            value={editedNews.text}
            onChange={(e) =>
              setEditedNews({ ...editedNews, text: e.target.value })
            }
            className="form-control"
          ></textarea>
        ) : (
          <div
            className="line-clamp"
            dangerouslySetInnerHTML={{ __html: news.text }}
          />
        )}
      </div>

      <div className="news-item__ceil _actions">
        <button
          onClick={handleEditStart}
          className="btn btn-info news-item__btn"
        >
          {isEditing ? `Update` : `Edit`}
        </button>

        <button
          onClick={handleDelete}
          className="btn btn-danger news-item__btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NewsItem;
