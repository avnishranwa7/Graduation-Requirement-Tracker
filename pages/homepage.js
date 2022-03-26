import Head from "next/head";
import Navbar from './components/Navbar';
import styled from "styled-components";
import { useState } from "react";

import TableView from './components/Table';

export default function Homepage() {
    const [username, setusername] = useState("User");
    return (
      <div>
        <Head>
          <title>IITGN GR Tracker</title>
        </Head>
        <Navbar />
        <Main>
            <Welcome>Hello, <b>{username}</b></Welcome>
            <TableView />
            
        </Main>
      </div>
    );
  }

const Main = styled.div`
  margin: 3px;
`;

const Welcome = styled.p`
  font-size: 17px;
  margin-left: 15px;
`;