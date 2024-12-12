import React, { useState } from "react";

const Testing = () => {
  const [messages, setMessages] = useState([]);

  const fetchData = async (previousMessages) => {
    try {
      const apiKey = "AIzaSyB00q1ZqpIFO_f-9ZifO-UlW4Uy6E8t1Vg"; // Replace with your API key
      const prompt = buildPrompt(previousMessages); // Build prompt using previous messages

      const body = JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

      const data = await response.json();
      console.log(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to build the prompt with previous messages
  function buildPrompt(previousMessages) {
    let combinedPrompt = "";
    // Combine previous messages into a single string
    if (previousMessages && previousMessages.length > 0) {
      combinedPrompt = previousMessages.join("\n"); // Separate messages with newlines
    }

    // Add your desired prompt after the previous messages
    combinedPrompt += "\nYou: Hey there man."; // Replace "Hey there man." with your actual prompt

    return combinedPrompt;
  }

  return (
    <button onClick={() => fetchData(["Hey Dude", "What's cracking"])}>
      Click API
    </button>
  );
};

export default Testing;
