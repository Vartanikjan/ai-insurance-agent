export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Send lead data to Make.com webhook
    const webhookUrl = "https://hook.us2.make.com/8albdsryqbddn1dholni4ne5ic1j3woy";
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, timestamp: new Date().toISOString() })
    });

    res.status(200).json({ message: "Thank you! Your information has been received." });
  } catch (error) {
    console.error("Lead API error:", error);
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
} 
