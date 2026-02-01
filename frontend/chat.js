
//---------------Collect Username------------------
const username = localStorage.getItem("username");


document.getElementById("userDisplay").innerText =
  "Logged in as: " + username;
function getLoggedInUsername() {
  return localStorage.getItem("username");
}

function logout() {
  localStorage.clear();
  window.location.href = "home.html";
}

// ---------------- WebSocket ----------------
let socket = null;

const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

// ---------------- CONNECT ----------------
function connectWebSocket() {
  socket = new WebSocket(
    "wss://ddmmyyyy.execute-api.us-east-1.amazonaws.com/production"
  );

  socket.onopen = () => {
    addSystemMessage("Connected");
  };

  socket.onclose = () => {
    addSystemMessage("Disconnected");
  };

  socket.onerror = (err) => {
    console.error(err);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    addChatMessage(data.sender, data.message);
  };
}

// ---------------- DISCONNECT ----------------
function disconnectWebSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}

// ---------------- SEND MESSAGE ----------------
function sendMessage() {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    alert("Connect first");
    return;
  }

  const message = messageInput.value.trim();
  if (!message) return;

  socket.send(
    JSON.stringify({
      action: "sendMessage",
      sender: username,
      message: message
    })
  );

  messageInput.value = "";
}

// ---------------- UI HELPERS ----------------
function addChatMessage(sender, message) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${message}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addSystemMessage(text) {
  const div = document.createElement("div");
  div.className = "text-muted fst-italic";
  div.innerText = text;
  messagesDiv.appendChild(div);
}