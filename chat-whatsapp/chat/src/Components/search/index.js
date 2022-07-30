import React,{useContext} from "react"
import {ContainerSearch,Search} from "./style"
import {Context} from "../../context/ContextProvider"
export default  ()=>{
    const {useContact,setContacts,socket} = useContext(Context)
    const [useSeach,setSearch] = React.useState(null)
    React.useEffect(()=>{
        if(useSeach !== ''){
           let filtro = useContact.filter(item => item.name?.toUpperCase().includes(useSeach.toUpperCase()) || item.pushname?.toUpperCase().includes(useSeach.toUpperCase()) || item.number?.includes(useSeach))
           if(filtro.length > 0) setContacts(filtro)
           console.log(useSeach,filtro)
        }else{
            socket.emit("contacts")
        }
    },[useSeach])

    return (
        <ContainerSearch>
            <Search placeholder="pesquisar" type="search" onChange={(e)=>{
                setSearch(e.target.value)

            }}/>
        </ContainerSearch>
    )
}