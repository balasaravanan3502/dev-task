import React from "react";

import "./BookCard.css";

const BookCard = ({ data: { title, author, imageUrl, publish, subject } }) => {
  return (
    <div className="item">
      <img src={imageUrl} alt={title} />
      <header>
        <h2>{title}</h2>
      </header>
      <footer>
        <span>{author}</span> <span>{subject}</span>
      </footer>
    </div>
  );
};

export default BookCard;
