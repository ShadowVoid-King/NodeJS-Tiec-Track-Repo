fetch("http://127.0.0.1:3000/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ usernameOrEmail: "test", password: "12345678" })
}).then(r => r.json()).then(console.log).catch(console.error);
