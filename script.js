
/* Password Lock */

function unlock(){

let pass=document.getElementById("password").value;

if(pass==="Love123"){   // change password here
document.getElementById("lockScreen").style.display="none";
document.getElementById("app").style.display="block";
}else{
alert("Wrong password 😄");
}
}

/* Start Love Experience */

function startLove(){

document.getElementById("music").play();

let name=document.getElementById("name").value || "My Love";

fetch("http://localhost:5000/message")
.then(res=>res.json())
.then(data=>{
let text=name+", "+data.message;

typeWriter(text);
speak(text);
});
}

/* Typewriter */

function typeWriter(text){
let i=0;
document.getElementById("message").innerHTML="";

function typing(){
if(i<text.length){
document.getElementById("message").innerHTML+=text.charAt(i);
i++;
setTimeout(typing,50);
}
}
typing();
}

/* AI Voice Love Letter */

function speak(text){
let speech=new SpeechSynthesisUtterance(text);
speech.rate=0.9;
speech.pitch=1.1;
speechSynthesis.speak(speech);
}

/* Save Memory */

function saveMemory(){

let memory=document.getElementById("memoryText").value;

fetch("http://localhost:5000/memory",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({memory,time:new Date()})
});

alert("Memory saved ❤️");
}

/* Proposal Answer */

function answer(ans){

fetch("http://localhost:5000/save",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({answer:ans,time:new Date()})
});

if(ans==="YES"){
fireworks();
alert("Forever Together ❤️");
}else{
alert("No option disabled 😄");
}
}

/* Fireworks Hearts */

function fireworks(){

for(let i=0;i<60;i++){

let heart=document.createElement("div");
heart.className="heart";
heart.innerHTML="💖";
heart.style.left=Math.random()*100+"vw";

document.body.appendChild(heart);

setTimeout(()=>heart.remove(),4000);
}
}
