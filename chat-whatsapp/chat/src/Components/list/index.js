import React,{useState,useContext} from "react";
import {Li,ImgProfile,Paragraf,ContainerLI} from "./style.js"
import {Context} from "../../context/ContextProvider.js";
export default ({data,display})=>{
    const {useContact,chatAtual,setChatAtual,socket} = useContext(Context)

return (<ContainerLI display={display} >
    {
        data.map(item=><Li onClick={()=>{setChatAtual(item)
            console.log("Voce escolheu",item)
        }}><ImgProfile src={item.profile} />
           <Paragraf>{item.name || item.pushname}</Paragraf>  
                        </Li>)
    }
        </ContainerLI>)
    }
