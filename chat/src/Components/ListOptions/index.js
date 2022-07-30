import React,{useState,useContext} from "react";
import {Li,ImgProfile,Paragraf,ContainerLI} from "./style.js"
export default ({data})=>{
    const [useBackgroundColorOption,setBackgroundColorOption] = useState("")

return (
    <ContainerLI>
{data.map(
    (item)=>{
        return (
        <Li bgColor={useBackgroundColorOption} onClick={
            ()=>{
            item.event()

        }}>{item.name}
        </Li>)
    }
)}
    </ContainerLI>
)   
    
    }
