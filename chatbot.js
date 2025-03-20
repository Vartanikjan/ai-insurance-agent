async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    document.getElementById("chat-window").innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    document.getElementById("chat-window").innerHTML += `<p><strong>AI Agent:</strong> ${data.response || "Error processing request"}</p>`;

    document.getElementById("user-input").value = "";
}
