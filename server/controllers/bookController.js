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
  if (params["title"]) {
    query["title"] = { $regex: new RegExp(params["title"], "i") };
  }

  if (params["author"]) {
    query["author"] = { $regex: new RegExp(params["author"], "i") };
  }
  let sub = [];
  let subjectChecked = [];
  if (params["subjects"]) {
    subjectChecked = params["subjects"].split(",");

    subjectChecked.forEach((s) => {
      sub.push({ subjects: s });
    });
  } else {
    subjectChecked = ["English", "Science", "Social", "Maths"];
  }

  let page = parseInt(params["page"]) - 1;

  let count = await Books.count({ ...query, subject: { $in: subjectChecked } });
  let books = await Books.find({ ...query, subject: { $in: subjectChecked } })
    .limit(10)
    .skip(page * 10);

  try {
    res.status(200).json({ count, books });
  } catch (err) {
    next(err);
  }
};
