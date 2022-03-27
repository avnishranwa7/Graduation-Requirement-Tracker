import { useState } from "react";
import * as React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AddCourseModal({ uid, handleClose, setdata }) {
  const courses = [
    {
      course_code: "HS421",
      course_name: "ISE",
      counted_towards: "-",
      credits: 4,
    },
    {
      course_code: "CS614",
      course_name: "Advanced Algorithms",
      counted_towards: "-",
      credits: 4,
    },
    {
      course_code: "CS328",
      course_name: "Data Science",
      counted_towards: "-",
      credits: 4,
    },
  ];

  const [disp, setdisp] = useState(courses);

  const addCourse = async (course) => {
    let docRef = doc(db, "students", uid, "coursesOpted", course.course_code);
    await setDoc(docRef, {
      name: course.course_name,
      credits: course.credits,
      countedTowards: course.counted_towards,
    });
    handleClose();
    setdata([]);
  };

  const handleSearch = (query) => {
    query = query.toLowerCase();
    if (query === "") {
      setdisp(courses);
    }
    let arr = [];
    for (let i = 0; i < courses.length; i++) {
      let cur = courses[i];
      if (
        cur.course_code.toLowerCase().includes(query) ||
        cur.course_name.toLowerCase().includes(query)
      ) {
        arr.push(cur);
      }
    }
    setdisp(arr);
  };

  return (
    <div style={{ width: "500px" }}>
      <SearchBar>
        <SearchIcon style={{ marginTop: "3px", cursor: "pointer" }} />
        <Input
          type="text"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </SearchBar>
      <Courses>
        <Title>
          <span>Course Code</span>
          <span>Course Name</span>
          <span>Course Towards</span>
          <span>Credits</span>
        </Title>
        {disp.map((course, ind) => (
          <Course
            onClick={() => addCourse(course)}
            style={ind % 2 === 1 ? { backgroundColor: "#e5e5e5" } : {}}
          >
            <span>{course.course_code}</span>
            <span>{course.course_name}</span>
            <span>{course.counted_towards}</span>
            <span>{course.credits}</span>
          </Course>
        ))}
      </Courses>
    </div>
  );
}

const SearchBar = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  margin-left: -8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid;
  border-radius: 3px;
`;

const Courses = styled.div`
  width: 100%;
  border: 1px solid;
  border-radius: 3px;
  margin-top: 10px;
`;

const Title = styled.div`
  background-color: lightblue;
  margin-top: 0px;
  padding: 10px;
  justify-content: space-between;
  display: flex;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const Course = styled.div`
  justify-content: space-between;
  display: flex;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  &:hover {
    cursor: pointer;
  }
`;
