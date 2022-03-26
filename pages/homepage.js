import Head from "next/head";
import Navbar from './components/Navbar';
import styled from "styled-components";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {db} from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {doc} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

import TableView from './components/Table';

export default function Homepage() {
    const [username, setusername] = useState("User");
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          let docRef = doc(db, "students", user.uid);
          onSnapshot(docRef, (snapshot) =>{
            setusername(snapshot.data().name)
          })
        }
        else{
          window.location.href = '/login';
        }
      });
    }, []);
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