/* Password Lock */
function unlock(){
  let pass = document.getElementById("password").value.trim();
  if(pass === "Love123"){
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("app").style.display = "block";
  } else {
    alert("Wrong password 😄");
  }
}

/* Start Love Experience */
function startLove(){
  document.getElementById("music").play();
  let name = document.getElementById("name").value || "My Love";
  let text = name + ", welcome to our love universe 💖!";
  typeWriter(text);
  speak(text);
}

/* Typewriter */
function typeWriter(text){
  let i = 0;
  document.getElementById("message").innerHTML = "";
  function typing(){
    if(i < text.length){
      document.getElementById("message").innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 50);
    }
  }
  typing();
}

/* AI Voice Love Letter */
function speak(text){
  let speech = new SpeechSynthesisUtterance(text);
  speech.rate = 0.9;
  speech.pitch = 1.1;
  speechSynthesis.speak(speech);
}

/* Fireworks Hearts */
function fireworks(){
  for(let i = 0; i < 60; i++){
    let heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }
}

/* Popup Message */
function showPopup(text){
  let popup = document.getElementById("popup");
  popup.innerHTML = text;
  popup.classList.add("show");
  setTimeout(()=> popup.classList.remove("show"), 2500);
}

/* ===== sheet.best API endpoint ===== */
const SHEET_API = "https://api.sheetbest.com/sheets/c857e7bd-a610-45dc-99e6-6d8c8a9b3513";

/* Save Memory to Google Sheet */
async function saveMemory(){
  const name = document.getElementById("name").value || "Anonymous";
  const memory = document.getElementById("memoryText").value.trim();
  if(!memory){ showPopup("Please write a memory ❤️"); return; }

  try{
    const res = await fetch(SHEET_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ name, memory, proposal: "" })
    });
    if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    showPopup("Memory Saved ❤️");
    document.getElementById("memoryText").value = "";
  } catch(err){
    console.error("Error saving memory:", err);
    showPopup("Error Connecting to Sheet 😢");
  }
}

/* Proposal Answer to Google Sheet */
async function answer(ans){
  const name = document.getElementById("name").value || "Anonymous";

  try{
    const res = await fetch(SHEET_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ name, memory: "", proposal: ans })
    });
    if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    if(ans==="YES"){ fireworks(); showPopup("Forever Together ❤️"); }
    else showPopup("Maybe next time 😢");
  } catch(err){
    console.error("Error sending answer:", err);
    showPopup("Error Connecting to Sheet 😢");
  }
}
