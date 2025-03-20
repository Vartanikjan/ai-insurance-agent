async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    displayMessage("You", userInput, "user-message");

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        displayMessage("AI Agent", data.response || "I'm sorry, I couldn't process that request.", "ai-message");

    } catch (error) {
        console.error("Chatbot Error:", error);
        displayMessage("AI Agent", "Error connecting to AI. Please try again later.", "ai-message");
    }

    document.getElementById("user-input").value = "";
}

// Function to Display Messages in Chat
function displayMessage(sender, text, className) {
    const chatWindow = document.getElementById("chat-window");
    const messageElement = document.createElement("p");
    messageElement.classList.add("message", className);
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
