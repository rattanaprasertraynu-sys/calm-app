const API_URL = "https://script.google.com/macros/s/AKfycbzKRkJk_i3XLIpL0XPVRUiWt6M56OFiCW9jZTIqPptyz0fV7dE4SrslZWKosRi0N7Q/exec";

// state
let userMessage = "";
let userFeeling = "";

// STEP 1: รับ input
function handleSubmit() {
  const input = document.getElementById("userInput").value;
  userMessage = input;

  const reflection = getReflection(input);

  showText("response", reflection);
  showElement("flowerCheck");
}

// STEP 2: reflection logic (phase 1 = rule-based)
function getReflection(text) {
  text = text.toLowerCase();

  if (text.includes("เหนื่อย")) {
    return "วันนี้คุณน่าจะใช้พลังไปเยอะเลย\nมันโอเคนะที่จะรู้สึกแบบนี้";
  }

  if (text.includes("เครียด")) {
    return "เหมือนมันยังค้างอยู่ในใจนะ\nมันคงไม่ง่ายเลย";
  }

  return "ขอบคุณที่เล่าให้ฟังนะ\nฟังดูแล้วมันมีหลายอย่างอยู่ในนั้นเลย";
}

// STEP 3: เลือก flower
function handleFlower(flower) {
  userFeeling = flower;
// 🔥 add selected state
document.querySelectorAll(".flower-group button")
.forEach(btn => btn.classList.remove("selected"));

event.target.classList.add("selected");
  const messageMap = {
    seed: "แม้จะเหนื่อย แต่คุณยังยืนอยู่ตรงนี้ได้ เก่งมากเลยนะ",
    leaf: "ไม่เป็นไรนะ บางช่วงมันก็แค่ยังนิ่งอยู่",
    blossom: "ดีขึ้นนิดนึงก็ถือว่าเป็นก้าวที่สำคัญแล้วนะ",
    sunflower: "ดีมากเลยนะ เก็บพลังนี้ไว้ค่อย ๆ ไปต่อ"
  };

  showText("response", "\n\n" + messageMap[flower], true);
  showElement("feedback");
}

// STEP 4: ส่ง data
function submitFeedback() {
  const feedback = document.getElementById("feedbackText").value;

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: userMessage,
      feeling: userFeeling,
      feedback: feedback
    })
  })
  .then(res => res.text())
  .then(data => {
    console.log("Saved:", data);
    alert("ขอบคุณสำหรับ feedback 🌸");
  })
  .catch(err => console.error(err));
}

// UI helper
function showElement(id) {
  const el = document.getElementById(id);
  el.style.display = "block";
  el.style.opacity = 0;

  setTimeout(() => {
    el.style.transition = "opacity 0.5s";
    el.style.opacity = 1;
  }, 50);
}

function showText(id, text, append = false) {
  const el = document.getElementById(id);
  el.classList.remove("hidden");

  if (append) {
    el.innerText += text;
  } else {
    el.innerText = text;
  }
}





