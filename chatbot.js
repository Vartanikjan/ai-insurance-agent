// Function to send user message to AI chatbot
async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    // Display user message in chat window
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

    // Clear input field
    document.getElementById("user-input").value = "";
}

// Function to display messages in chat window
function displayMessage(sender, text, className) {
    const chatWindow = document.getElementById("chat-window");
    const messageElement = document.createElement("p");
    messageElement.classList.add("message", className);
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to latest message
}

// Function to handle lead form submission
document.getElementById("lead-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !email || !phone) {
        alert("Please fill in all fields.");
        return;
    }

    const leadData = { name, email, phone };

    try {
        const response = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(leadData)
        });

        const result = await response.json();
        alert(result.message || "Thank you! A trusted insurance agent will contact you soon.");
        
        // Clear form fields
        document.getElementById("lead-form").reset();

    } catch (error) {
        console.error("Lead Submission Error:", error);
        alert("There was an error submitting your request. Please try again later.");
    }
});
