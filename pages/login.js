import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import logo from "../public/iitgnlogo.png";
import { IconButton, Button, Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import * as EmailValidator from "email-validator";
import { doc, setDoc } from "firebase/firestore";

export default function Login() {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const [showPass1, setShowPass1] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [name, setName] = useState("");
  const confRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // window.location.href = "/homepage";
        console.log("Effect", user.uid);
      }
    });
  }, []);

  const domainCheck = (email) => {
    let domain = "iitgn.ac.in";
    let res = "";
    let flag = false;
    for (let i = 0; i < email.length; i++) {
      if (flag) {
        res += email[i];
      }
      if (email[i] === "@") {
        flag = true;
      }
    }
    return res === domain;
  };

  const handleSignUp = () => {
    if (
      emailRef.current.value === "" ||
      passRef.current.value === "" ||
      confRef.current.value === "" ||
      name === ""
    ) {
      setError("Please fill all the fields");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (passRef.current.value !== confRef.current.value) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (EmailValidator.validate(emailRef.current.value)) {
      if (domainCheck(emailRef.current.value)) {
        createUserWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passRef.current.value
        )
          .then((userCred) => {
            console.log("Uid:", userCred.user.uid);
            let docRef = doc(db, "students", userCred.user.uid);
            setDoc(docRef, {
              name: name,
              email: emailRef.current.value,
            }).then(() => {
              console.log("Success");
              window.location.href = "/homepage";
            });
          })
          .catch((error) => {
            setError("Credentials already in use");
            setTimeout(() => {
              setError("");
            }, 3000);
          });
      } else {
        setError("Please use your IITGN email");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } else {
      setError("Please enter a proper email");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleLogin = () => {
    if (emailRef.current.value === "") {
      setError("Please enter the email");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (passRef.current.value === "") {
      setError("Please enter the password");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (EmailValidator.validate(emailRef.current.value)) {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passRef.current.value
      )
        .then((userCred) => {
          window.location.href = "/homepage";
        })
        .catch((error) => {
          error.code === "auth/user-not-found"
            ? setError("Error: Invalid Credentials")
            : setError("Error: Server Error");
          setTimeout(() => {
            setError("");
          }, 3000);
          console.log(error.code);
        });
    } else {
      setError("Please enter a proper email");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div align="center">
      <Head>
        <title>IITGN GR Tracker</title>
      </Head>
      <Total>
        <ImageContainer>
          <Image src={logo} alt="IITGN" width={"180px"} height={"180px"} />
        </ImageContainer>
        {error && (
          <Alert severity="error" style={{ width: "20em", margin: "10px 0px" }}>
            {error}
          </Alert>
        )}
        {isNewUser ? (
          // Sign-Up Page
          <Box
            style={
              error
                ? { height: "410px" }
                : { marginTop: "30px", height: "410px" }
            }
          >
            <div align="left" style={{ marginLeft: "20px", fontSize: "20px" }}>
              <Header>Sign-Up</Header>
            </div>
            <Inputs>
              <Ins
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <br />
              <br />

              <Ins placeholder="Enter Email" ref={emailRef} />

              <br />
              <br />

              <Ins
                placeholder="Enter Password"
                type={showPass ? "text" : "password"}
                ref={passRef}
              />
              <IconButton
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  marginLeft: "-30px",
                  color: `${showPass ? "#303073" : "black"}`,
                }}
              >
                <VisibilityIcon style={{ fontSize: "medium" }} />
              </IconButton>

              <br />
              <br />

              <Ins
                placeholder="Confirm Password"
                type={showPass1 ? "text" : "password"}
                ref={confRef}
              />
              <IconButton
                onClick={() => setShowPass1(!showPass1)}
                style={{
                  position: "absolute",
                  marginLeft: "-30px",
                  color: `${showPass1 ? "#303073" : "black"}`,
                }}
              >
                <VisibilityIcon style={{ fontSize: "medium" }} />
              </IconButton>
            </Inputs>

            <ButtonContainer>
              <Button
                variant="contained"
                color="success"
                style={{ width: "18em" }}
                onClick={handleSignUp}
              >
                Continue
              </Button>
            </ButtonContainer>
            <LinkContainer>
              <StateLink onClick={() => setIsNewUser(false)}>
                Already a User?
              </StateLink>
            </LinkContainer>
          </Box>
        ) : (
          // Sign-In Page
          <Box
            style={
              error
                ? { marginTop: "0px" }
                : { marginTop: "30px", height: "330px" }
            }
          >
            <div align="left" style={{ marginLeft: "20px", fontSize: "20px" }}>
              <Header>Sign-In</Header>
            </div>
            <Inputs>
              <Ins placeholder="Enter Email" ref={emailRef} />
              <br />
              <br />
              <Ins
                placeholder="Enter Password"
                type={showPass ? "text" : "password"}
                ref={passRef}
              />
              <IconButton
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  marginLeft: "-30px",
                  color: `${showPass ? "#303073" : "black"}`,
                }}
              >
                <VisibilityIcon style={{ fontSize: "medium" }} />
              </IconButton>
            </Inputs>
            <ButtonContainer>
              {/* <SubmitButton>Continue</SubmitButton> */}
              <Button
                variant="contained"
                color="success"
                style={{ width: "18em" }}
                onClick={handleLogin}
              >
                Continue
              </Button>
            </ButtonContainer>
            <LinkContainer>
              <StateLink onClick={() => setIsNewUser(true)}>
                New User?
              </StateLink>
            </LinkContainer>
          </Box>
        )}
      </Total>
    </div>
  );
}

const LinkContainer = styled.div`
  color: whitesmoke;
  margin-top: 20px;
`;

const StateLink = styled.a`
  :hover {
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 50px;
`;

// const SubmitButton = styled.button`
//   border: none;
//   background-color: #e5e5e5;
//   letter-spacing: 1.5px;
//   height: 30px;
//   width: 20em;
//   border-radius: 5px;
// `;

const Total = styled.div`
  background-color: #303073;
  min-height: 100vh;
  padding-bottom: 20px;
`;

const ImageContainer = styled.div`
  padding-top: 3vh;
`;

const Box = styled.div`
  height: 350px;
  width: 350px;
  border: 1.5px solid #e5e5e5;
  border-radius: 5px;
`;

const Ins = styled.input`
  outline: none;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.07) inset;
  border-top-color: #949494;
  width: 20em;
  height: 30px;
  border: 1.5px solid #e5e5e5;
  border-radius: 5px;
  padding-left: 8px;
  :focus {
    outline: none;
    border-color: #303073;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2),
      0 1px 0 rgba(0, 0, 0, 0.07) inset;
  }
`;

const Inputs = styled.div`
  margin-top: 30px;
`;

const Header = styled.h3`
  color: white;
`;
