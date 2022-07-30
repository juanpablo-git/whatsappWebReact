const {io,app,server} = require('./server.js')
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require("fs");
const client = new Client();

//Array com os contatos
var contatos = Array()
//Array com os chats
var bd_chats = Array()
var banco = []

app.get("/",(req,res)=>{
res.send(banco);   
})

io.on('connection',(socket)=>{
    //Listar contatod
    socket.on('contacts',()=>{
        io.emit("contatos",contatos)
    })

    //Listar chats
    socket.on('chats',()=>{
        io.emit("list chat",bd_chats)
    })
    //Envia mensagens    
    socket.on("send message",({to,message})=>{
        client.sendMessage(to, message)
        console.log('Enviou mensagem',to,message)
    })
    
    console.log("conectaado")
})

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', async() => {

    console.log('Client is ready!');
    //Busca os contatos
    const contacts =  await client.getContacts()
    ///Busca os chats
    const chats = await client.getChats()
    // const getMensages = await chats[0].fetchMessages()
    //Adiciona os contatos no array
    contatos.push(contacts)
    //Adiciona os chats no array
    bd_chats.push(chats)
    //Função que busca as mensagens e o perfil de usuario
    bd_chats[0].map(async (item,key)=>{
        console.log("Chat",item.id)
        //Biusca as mensagens
        const fetChat = await chats[key].fetchMessages()
        let serial = item.id._serialized
        //Busca o perfil
        const chatProfile = await client.getProfilePicUrl(serial)
         item.profile = chatProfile
         item.menssagens = fetChat

    })
    contatos[0].map(async(item)=>{
        let serial = item.id._serialized
        //Busca o perfil do chat
        const chatProfile = await client.getProfilePicUrl(serial)
        return item.profile = chatProfile
    })
    ////////////////////////////////////////////////////////
    
})
//Evento que esculta  as mensagens
client.on('message',async message => {
	console.log(message);
    //Se a mensegem for alguma midia execulta o if
    if(message.hasMedia){
        //Download da media
        const media = await message.downloadMedia()
        console.log("MEDIA",media);
        //Caminho onde vai ser salvo
        var uploadFile =`./${message.from}-${Math.random()*1E10}.${media.mimetype.split("/",3)[1].slice(0,3)}`
        //função que salva o arquivo
        fs.writeFile(uploadFile, media.data,"base64", err2 => {
            if (err2) {
                console.log(err2);
                return;
            }
        })
        banco.push({body:message.body,from:message.from,nofyName:message._data.notifyName,file:uploadFile});
    }else{
        banco.push({body:message.body,from:message.from,nofyName:message._data.notifyName,file:uploadFile});
    }

});
    
server.listen("3001",()=>console.log("API INICIADA na porta 3001"))
client.initialize();
