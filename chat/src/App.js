import React, { useEffect,useContext,useState} from "react"
import {Context} from "./context/ContextProvider"
import {Container,DivLeft,DivRigth,
Footer,Header,Main,
ListChat} from "./style"
import List from "./Components/list/index";
import ListOptions from "./Components/ListOptions";

import Search  from "./Components/search/index";
import io from "socket.io-client"
import SendMessage from "./Components/SendMessage";

const socket = io("http://localhost:3001")

function App() {
  const [chatAtual,setChatAtual] = useState([]);
  const [useContact,setContacts] = useState([])
  const [useChats,setChats] = useState([])
  const [displayListChat,setDisplayListChat] = useState(false)
  const [datalisContacts,setDisplayListContacts] = useState(true)

  useEffect(()=>{
    socket.emit("contacts")
    socket.emit("chats")
    socket.on("list chat",(data)=>{
      setChats(data[0])
      console.log("Chat",data)
    })
    socket.on("contatos",function(data){
    setContacts(data[0])
    console.log("Contaots",data)
        })
  },[])
  return (
    <Context.Provider 
      value={
          {useContact,setContacts,socket,chatAtual,setChatAtual}
    }>
    <Container>
      <DivLeft>
      <Search />
      <ListOptions data={[
        {name:"Chat",event:()=>{
          setDisplayListChat(true) 
          setDisplayListContacts(false)
         }},
        {name:"Contatos",event:()=>{
          setDisplayListChat(false) 
          setDisplayListContacts(true)
        }}
      ]
      }  />
     <List display={displayListChat} data={useChats} />
     <List display={datalisContacts}  data={useContact} />
     </DivLeft>
     <DivRigth>
        <Header> <img style={{margin:"1rem",borderRadius:"100%"}} src={chatAtual.profile} width="60" /> {chatAtual.name}</Header>
        <Main>
          {
              chatAtual.menssagens?.map(item=><div style={{margin:"1px",padding:"1px",textAlign:item.fromMe && "-moz-right"}} ><ListChat fromMe={item.fromMe}>{item.body}</ListChat></div>)
               
          }
        </Main>
        <Footer>
          <SendMessage />
        </Footer>
     </DivRigth>
    </Container>
    </Context.Provider>
  );
}

export default App;
