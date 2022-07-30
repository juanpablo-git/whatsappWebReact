import styled from "styled-components";
export const Container = styled.div`
background-color: aliceblue;
display: flex;
margin: 0% auto;
width: 100vw;
height:100vh;
`

export const DivLeft = styled.div`
width:30%;
overflow: auto;
`
export const DivRigth = styled.div`
background-color: aquamarine;
width:70%;
overflow-x: scroll;
`

export const Header = styled.header`
position: fixed;
width: 100%;
display: flex;
align-items: center;
background-color: #f0f8ff;
margin-bottom: 10px;
`
export const Main = styled.main`
margin-top: 1rem;
`
export const Footer = styled.footer`
background-color: black;
position: absolute;
bottom:0px;
width: 70%;
background-color:#f0f8ff;
`
export const ListChat  = styled.dl`
width: fit-content;
padding: .5rem;
text-align: right;
background-color: ${prop=>prop.fromMe? "#f0f8ff" :"#008b8b"};
margin-left:${prop=>prop.fromMe && "60%"} ;
;
`