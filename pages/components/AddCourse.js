import * as React from 'react';
import styled from "styled-components";
import TextField from '@mui/material/TextField';

export default function AddCourseModal() {

  return (
    <div style={{width: '500px'}}>
        <SearchBar>
          <Input type="text" placeholder='Search...'/>
        </SearchBar>
        <Courses>
          <Title>
            <span>Course Code</span>
            <span>Course Name</span>
            <span>Course Towards</span>
            <span>Credits</span>
          </Title>
          <Course>
            <span>Course Code</span>
            <span>Course Name</span>
            <span>Course Towards</span>
            <span>Credits</span>
          </Course>
        </Courses>
    </div>
  );
}

const SearchBar = styled.div`
    width: 100%;
    padding: 5px;
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
`;

const Course = styled.div`
    justify-content: space-between;
    display: flex;
    padding: 10px;
`;