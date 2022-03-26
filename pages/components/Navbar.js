import logo from "../../public/iitgnlogo.png";
import Image from "next/image";
import styled from "styled-components";
import Button from '@mui/material/Button';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Navbar = () =>{

    const LogOut = () =>{
        signOut(auth).then(() =>{
            window.location.href = '/login';
        })
    }

    return(
        <Nav>
            <ImageContainer>
                <Image src={logo} alt="IITGN" width={"70px"} height={"70px"}/>
            </ImageContainer>
            <p style={{fontSize: "24px"}}>Graduation Requirement Tracker</p>
            <Button onClick={LogOut} variant='contained' style={{height: '40px', marginRight: '10px'}}>Log Out</Button>
        </Nav>
    );
}

const Nav = styled.div`
    display: flex;
    border-bottom: 1px solid #e5e5e5;
    justify-content: space-between;
    align-items: center;
`;

const ImageContainer = styled.div`
    margin: 10px;
`;

export default Navbar;