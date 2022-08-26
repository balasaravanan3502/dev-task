import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

import SidePanel from "../../components/SidePanel";
import BookList from "../../components/BookList";

import { SubjectData } from "../../constants/SubjectData";

import "./index.css";

const Home = () => {
  const startDate = Date.parse("01 Jan 2021 00:00:00 GMT");
  const endDate = Date.now();

  const [titleInput, setTitleInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [subjectSelected, setSubjectSelected] = useState(SubjectData);
  const [fromDate, setFromDate] = useState(startDate);
  const [toDate, setToDate] = useState(endDate);
  const [data, setData] = useState();

  const [pageNumber, setPageNumber] = useState(0);
  const [pageNumbers, setpageNumbers] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleSubjectChecked = (id) => {
    const subjectList = subjectSelected;
    const subjects = subjectList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setSubjectSelected(subjects);
  };

  const applyFilter = () => {
    let params = getParamsUrl(0);
    const fetchFilterData = async () => {
      const response = await fetch(
        `https://ui-task-vpbs.herokuapp.com/book${params}`
        // `http://localhost:5000/book${params}`
      );
      const newData = await response.json();
      console.log(newData);
      setData(newData);

      let pages = [];

      for (let i = 1; i <= Math.ceil(newData["count"] / 10); i++) {
        pages.push(i);
      }
      setpageNumbers(pages);
    };

    fetchFilterData();
  };

  const getParamsUrl = (page) => {
    let params = "?";

    if (titleInput) params += `title=${titleInput.toLowerCase()}&`;
    if (authorInput) params += `author=${authorInput.toLowerCase()}&`;

    const subjectChecked = subjectSelected
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (subjectChecked.length > 0) {
      params += "subjects=";
      for (let sub in subjectChecked) {
        params += SubjectData[sub].label + ",";
      }
      params = params.substring(0, params.length - 1) + "&";
    }

    if (fromDate !== startDate) params += `from=${fromDate}&`;
    // if (toDate !== endDate) params += `to=${toDate}`;

    if (page !== 0) params += `page=${page}&`;

    navigate(params.substring(0, params.length - 1));

    return params;
  };

  const paginate = async (e) => {
    await setPageNumber(parseInt(e.target.textContent));

    if (parseInt(e.target.textContent) !== 0) {
      getParamsUrl(parseInt(e.target.textContent));
    }
    fetchData(parseInt(e.target.textContent));
  };

  const fetchData = async (page) => {
    let params = "?";
    if (searchParams.get("title")) {
      params += "title=" + searchParams.get("title") + "&";
      setTitleInput(searchParams.get("title"));
    }
    if (searchParams.get("author")) {
      params += "author=" + searchParams.get("author") + "&";
      setAuthorInput(searchParams.get("author"));
    }
    if (searchParams.get("subjects"))
      params += "subjects=" + searchParams.get("subjects") + "&";
    if (searchParams.get("from"))
      params += "from=" + searchParams.get("from") + "&";
    if (searchParams.get("to")) params += "to=" + searchParams.get("to") + "&";
    if (page > 0) {
      params += "page=" + page + "&";
      setPageNumber(searchParams.get("page"));
    }

    const response = await fetch(
      `https://ui-task-vpbs.herokuapp.com/book${params}`
      // `http://localhost:5000/book${params}`
    );
    const newData = await response.json();
    setData(newData);
    let pages = [];

    for (let i = 1; i <= Math.ceil(newData["count"] / 10); i++) {
      pages.push(i);
    }

    setpageNumbers(pages);
  };

  useEffect(() => {
    fetchData(0);
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
            fetchData={fetchData}
          />
        </div>
        {data && data["books"].length > 0 ? (
          <div className="list_wrapper">
            <BookList data={data} />
            <Pagination
              count={pageNumbers.length}
              style={{ margin: "auto", marginBottom: "3rem" }}
              onClick={paginate}
            />
          </div>
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
};

export default Home;
