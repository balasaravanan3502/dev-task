import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import SidePanel from "../../components/SidePanel";
import BookList from "../../components/BookList";

import { BookData } from "../../constants/BookData";
import { SubjectData } from "../../constants/SubjectData";

import "./index.css";

const Home = () => {
  const [titleInput, setTitleInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [subjectSelected, setSubjectSelected] = useState(SubjectData);
  const [fromDate, setFromDate] = useState(
    Date.parse("01 Jan 2021 00:00:00 GMT")
  );
  const [toDate, setToDate] = useState(Date.now());
  const [data, setData] = useState();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleSubjectChecked = (id) => {
    const cusinesStateList = subjectSelected;
    console.log(id);
    const changeCheckedCuisines = cusinesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setSubjectSelected(changeCheckedCuisines);
  };

  const applyFilter = () => {
    // let updatedList = BookData;
    // let params = "";

    // if (titleInput) {
    //   updatedList = updatedList.filter(
    //     (book) => book.title.toLowerCase() === titleInput.toLowerCase()
    //   );
    // }

    // if (authorInput) {
    //   updatedList = updatedList.filter(
    //     (book) => book.author.toLowerCase() === authorInput.toLowerCase()
    //   );
    // }

    // const subjectChecked = subjectSelected
    //   .filter((item) => item.checked)
    //   .map((item) => item.label.toLowerCase());

    // if (subjectChecked.length > 0) {
    //   updatedList = updatedList.filter((book) =>
    //     subjectChecked.includes(book.subject.toLowerCase())
    //   );
    // }

    // updatedList = updatedList.filter((book) => book.publish >= fromDate);
    // updatedList = updatedList.filter((book) => book.publish <= toDate);

    // setData(updatedList);

    let params = getParamsUrl();

    const fetchData = async () => {
      const response = await fetch(
        `https://ui-task-vpbs.herokuapp.com/book${params}`
      );
      const newData = await response.json();
      console.log(newData);
      setData(newData);
    };

    fetchData();
  };

  const getParamsUrl = () => {
    let params = "?";

    if (titleInput) params += `title=${titleInput.toLowerCase()}`;
    if (authorInput) params += `&author=${authorInput.toLowerCase()}`;

    const subjectChecked = subjectSelected
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (subjectChecked.length > 0) {
      params += "&subjects=";
      for (let sub in subjectChecked) {
        params += SubjectData[sub].label + ",";
      }
      params = params.substring(0, params.length - 1);
    }

    params += `&from=${fromDate}`;
    params += `&to=${toDate}`;

    console.log(params);
    navigate(`${params}`);

    return params;
  };

  useEffect(() => {
    const fetchData = async () => {
      let params = "?";
      if (searchParams.get("title"))
        params += "title=" + searchParams.get("title") + "&";
      if (searchParams.get("author"))
        params += "author=" + searchParams.get("title") + "&";
      if (searchParams.get("subjects"))
        params += "subjects=" + searchParams.get("subjects") + "&";
      if (searchParams.get("from"))
        params += "from=" + searchParams.get("from") + "&";
      if (searchParams.get("to"))
        params += "to=" + searchParams.get("to") + "&";

      const response = await fetch(
        `https://ui-task-vpbs.herokuapp.com/book${params}`  
      );
      const newData = await response.json();
      console.log(newData);
      setData(newData);
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="home_wrapper">
        <div className="panel_wrapper">
          <SidePanel
            title={titleInput}
            changeTitle={(e) => setTitleInput(e.target.value)}
            author={authorInput}
            changeAuthor={(e) => setAuthorInput(e.target.value)}
            subjectSelected={subjectSelected}
            changeSubjectSelected={handleSubjectChecked}
            fromDate={fromDate}
            changeFromDate={setFromDate}
            toDate={toDate}
            changeToDate={setToDate}
            applyFilter={applyFilter}
          />
        </div>
        {data && data.length > 0 ? (
          <div className="list_wrapper">
            <BookList books={data} />
          </div>
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
};

export default Home;
