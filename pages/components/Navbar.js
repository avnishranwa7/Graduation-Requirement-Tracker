import logo from "../../public/iitgnlogo.png";
import Image from "next/image";
import styled from "styled-components";

const Navbar = () =>{
    return(
        <Nav>
            <ImageContainer>
                <Image src={logo} alt="IITGN" width={"70px"} height={"70px"}/>
            </ImageContainer>
            <p style={{fontSize: "24px"}}>Graduation Requirement Tracker</p>
        </Nav>
    );
}

const Nav = styled.div`
    display: flex;
    border-bottom: 1px solid #e5e5e5;
`;

const ImageContainer = styled.div`
    margin: 10px;
`;

export default Navbar;