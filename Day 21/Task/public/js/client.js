const socket = io();
const username = localStorage.getItem("username");

document.getElementById("user").textContent = username;
socket.emit("register", username);

let currentChatUser = null;
let typingTimeout = null;

// Search user & add friend
document.getElementById("searchBtn").addEventListener("click", async () => {
  const friendUsername = document.getElementById("searchUser").value;

  const res = await fetch("/chat/add-friend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, friendUsername })
  });

  const data = await res.json();
  alert(data.message);

  loadFriends();
});

// Load friends
async function loadFriends() {
  const res = await fetch(`/chat/get-friends?username=${username}`);
  const data = await res.json();

  const friendsList = document.getElementById("friendsList");
  friendsList.innerHTML = "";

  data.friends.forEach(friend => {
    const li = document.createElement("li");
    li.textContent = friend;

    const btn = document.createElement("button");
    btn.textContent = "Chat";
    btn.addEventListener("click", () => {
      currentChatUser = friend;
      document.getElementById("chatBox").innerHTML = "";
      document.getElementById("typing").textContent = "";
    });

    li.appendChild(btn);
    friendsList.appendChild(li);
  });
}

loadFriends();

// Send message
document.getElementById("sendBtn").addEventListener("click", () => {
  if (!currentChatUser) {
    alert("Select a friend first!");
    return;
  }

  const message = document.getElementById("message").value;
  socket.emit("private-message", { to: currentChatUser, message });

  addMessage(`You ➡️ ${currentChatUser}: ${message}`);
  document.getElementById("message").value = "";
  emitTyping(false);
});

socket.on("private-message", (data) => {
  if (data.from === currentChatUser) {
    addMessage(`${data.from} ➡️ You: ${data.message}`);
  } else {
    alert(`New message from ${data.from}`);
  }
});

function addMessage(msg) {
  const chatBox = document.getElementById("chatBox");
  const p = document.createElement("p");
  p.className = "message";
  p.textContent = msg;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Logout
document.getElementById("logout").addEventListener("click", () => {
  fetch("/auth/logout")
    .then(res => res.json())
    .then((data) => {
      if (data.message === "Logout successful") {
        localStorage.removeItem("username");
        window.location.href = "/auth/login";
      } else {
        alert(data.message);
      }
    });
});

// Typing indicator
const msgInput = document.getElementById("message");
msgInput.addEventListener("input", () => {
  if (!currentChatUser) return;
  emitTyping(true);
  if (typingTimeout) clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => emitTyping(false), 1200);
});

function emitTyping(isTyping) {
  socket.emit("typing", { to: currentChatUser, isTyping });
}

socket.on("typing", ({ from, isTyping }) => {
  if (from !== currentChatUser) return;
  const el = document.getElementById("typing");
  el.textContent = isTyping ? `${from} is typing...` : "";
});
