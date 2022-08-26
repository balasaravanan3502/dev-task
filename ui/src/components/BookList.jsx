import React from "react";
import BookCard from "./BookCard";

import "./BookList.css";

const BookList = ({ data }) => {
  return (
    <div>
      <h1>Total Books Available : {data.count}</h1>
      <div className="wrapper">
        {data.books.map((book, index) => (
          <BookCard data={book} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
