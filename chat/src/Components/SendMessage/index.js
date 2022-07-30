import React from "react"
import { IoMdSend } from "react-icons/io";
import {BsEmojiSmile} from "react-icons/bs"
import {ContainerSendMessage,Input} from "./style"
export default ()=>{

    return(
        <ContainerSendMessage>
            <BsEmojiSmile color="#abb5ba" size="2rem"/>
            <Input placeholder="digite sua mensagem" type='text' />
            <IoMdSend color="#abb5ba" size="2rem"/>
        </ContainerSendMessage>

    )

}