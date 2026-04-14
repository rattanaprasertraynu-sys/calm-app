const API_URL = "https://script.google.com/macros/s/AKfycbzKRkJk_i3XLIpL0XPVRUiWt6M56OFiCW9jZTIqPptyz0fV7dE4SrslZWKosRi0N7Q/exec";

let userMessage = "";
let userFlower = "";

function handleSubmit() {
  const input = document.getElementById("userInput").value;
  userMessage = input;

  const reflection = getReflection(input);

  const responseBox = document.getElementById("response");
  responseBox.innerText = reflection;
  responseBox.classList.remove("hidden");

  document.getElementById("flowerCheck").classList.remove("hidden");
}

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

function handleFlower(flower) {
  userFlower = flower;

  let message = "";

  if (flower === "seed") {
    message = "แม้จะเหนื่อย แต่คุณยังยืนอยู่ตรงนี้ได้ เก่งมากเลยนะ";
  }

  if (flower === "leaf") {
    message = "ไม่เป็นไรนะ บางช่วงมันก็แค่ยังนิ่งอยู่";
  }

  if (flower === "blossom") {
    message = "ดีขึ้นนิดนึงก็ถือว่าเป็นก้าวที่สำคัญแล้วนะ";
  }

  if (flower === "sunflower") {
    message = "ดีมากเลยนะ เก็บพลังนี้ไว้ค่อย ๆ ไปต่อ";
  }

  document.getElementById("response").innerText += "\n\n" + message;

  document.getElementById("feedback").classList.remove("hidden");
}

function submitFeedback() {
  const feedback = document.getElementById("feedbackText").value;

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      message: userMessage,
      flower: userFlower,
      feedback: feedback
    })
  });

  alert("ขอบคุณสำหรับ feedback 🌸");
}