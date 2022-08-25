import Books from "../models/BookModel.js";

export const createBook = async (req, res, next) => {
  const newBook = new Books(req.body);

  try {
    const savedBook = await newBook.save();
    res.status(200).json(savedBook);
  } catch (err) {
    next(err);
  }
};

export const getBooks = async (req, res, next) => {
  let params = req.query;
  let query = {};
  console.log(params);
  if (params["title"]) {
    query["title"] = { $regex: new RegExp(params["title"], "i") };
  }

  if (params["author"]) {
    query["author"] = { $regex: new RegExp(params["author"], "i") };
  }

  console.log(query);
  let books = await Books.find(query);

  if (params["subjects"]) {
    let subjectChecked = params["subjects"].split(",");
    let subj = subjectChecked.map((sub) => sub.toLowerCase());

    books = books.filter((book) => subj.includes(book.subject.toLowerCase()));
  }

  console.log(query);
  try {
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};
