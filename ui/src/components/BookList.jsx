import React from "react";
import BookCard from "./BookCard";

import "./BookList.css";

const BookList = ({ books }) => {
  console.log(books);
  return (
    <div>
      <h1>Total Books Available : {books.total}</h1>
      <div className="wrapper">
        {books.books.map((book, index) => (
          <BookCard data={book} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
