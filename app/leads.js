export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ error: "All fields are required" });
        }

        console.log("New Lead Captured:", { name, email, phone });

        // Here, we can later connect this to a Google Sheet, CRM, or database

        res.status(200).json({ message: "Lead captured successfully!" });

    } catch (error) {
        console.error("Lead Capture Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
