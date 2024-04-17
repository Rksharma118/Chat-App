const socket=io(`http://localhost:8000`);

const form=document.getElementById('send-container')
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
var audio = new Audio('facebook_chat_sound.mp3');

const append=(message,position)=>{
    const messageElement= document.createElement('div');
    messageElement.innertext=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
append(`You: ${message}`,'right')   /*if i send a message then it will be shown on the right*/
socket.emit('send',message)
messageInput.value=''              /*message send karne ke baad input ko clear karne ke liye*/
})

const name=prompt("enter your name");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
})

socket.on('left',name=>{
    append(`${name} has left the chat`,'left')

})