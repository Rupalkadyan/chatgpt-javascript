const chatInput =document.querySelector("#chat-input");
const sendButton =document.querySelector("#send-btn");
const chatContainer =document.querySelector(".chat-container");
const theme =document.querySelector("#theme-btn");
let userText=null;
//use your own api -key;
const API_KEY ="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";
const loadDataFromLocalstorage = ()=>{
    chatContainer.innerHTML=localStorage.getItem("all-chats");}
    loadDataFromLocalstorage();
const createElement=(html,className)=>{
    const chatDiv=document.createElement("div");
    chatDiv.classList.add("chat",className);
    chatDiv.innerHTML=html;
    return chatDiv;
}
//define data we get from api,
const pElement=document.createElement("div");
const getChatResponse= async(incomingChatDiv)=>{
    const API_URL="https://api.openai.com/v1/completions";
    
    const requestOptions={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        body:JSON.stringify({
            model:"text-davinci-003",
            prompt: userText,
            max_tokens:2048,
            temperature:0.2,
            n: 1,
            stop:null
        })
    }
    try{
        const response = await (await fetch(API_URL,requestOptions)).json();
        pElement.textContent=response.choices[0].text;
    }catch(error){
        console.log("error");
    }
    //extra;
    localStorage.setItem("all-chats",chatContainer.innerHTML);
}
const copyResponse=(copyBtn)=>{
    const responseTextElement=copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(responseTextElement.textContent);
    copyBtn.textContent="done";
    setTimeout(()=>copyBtn.textContent="content_copy",1000);
}
const showingTypingAnimation=()=>{
    const html=`<div class="chat-content">
    <div class="chat-details">
        <img src="images/chatbot.jpg" alt="chat-img">
       <div class="typing-animation">
        <div class="typing-dot"style="--delay:0.2s"></div>
        <div class="typing-dot"style="--delay:0.3s"></div>
        <div class="typing-dot"style="--delay:0.4s"></div>
       </div>
             
    </div>
    <span onclick="copyResponse(this)" class="material-symbols-outlined">
        content_copy
        </span>
    
</div>`;
const incomingChatDiv = createElement(html,"incoming");
chatContainer.appendChild(incomingChatDiv);
 getChatResponse(incomingChatDiv);
 incomingChatDiv.querySelector(".typing-animation").remove();
 incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
}
const handleOutgoingchat=()=>{
    userText =chatInput.value.trim();
    const html=`<div class="chat-content">
    <div class="chat-details">
        <img src="images/user.jpg" alt="user-img">
        <p>${userText}</p>

    </div>
</div>`;
const outgoingChatDiv = createElement(html,"outgoing");
chatContainer.appendChild(outgoingChatDiv);
setTimeout(showingTypingAnimation,500);
}
theme.addEventListener("click",() => {
    document.body.classList.toggle("light-mode");
    theme.innerText=document.body.classList.contains("light-mode")?"dark_mode":"light_mode";
})
sendButton.addEventListener("click",handleOutgoingchat);