import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import logo from "../public/iitgnlogo.png";

export default function Login() {
  return (
    <div>
      <Head>
        <title>IITGN GR Tracker</title>
      </Head>
      <Total>
        <ImageContainer>
          <Image src={logo} alt="IITGN" width={"200px"} height={"200px"} />
        </ImageContainer>
      </Total>
    </div>
  );
}

const Total = styled.div`
  background-color: #303073;
  height: 100vh;
  width: 100vw;
`;

const ImageContainer = styled.div`
  text-align: center;
  padding-top: 3vh;
`;
