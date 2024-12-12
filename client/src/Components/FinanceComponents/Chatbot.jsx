import React, { useState } from "react";

const Chatbot = ({ setOpenChatbot }) => {
  // { sender: "BOT", msg: "testing" },
  // { sender: "USER", msg: "testing 2" },
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [reRender, doReRender] = useState(0);

  console.log(reRender);

  const onPromptChange = (e) => setPrompt(e.target.value);

  const fetchData = async (nowPrompt) => {
    let newMessage = messages;

    console.log(messages);

    try {
      const apiKey = "AIzaSyB00q1ZqpIFO_f-9ZifO-UlW4Uy6E8t1Vg"; // Replace with your API key

      let prompt = "";

      let previousMessages = messages.map((msg) => {
        if (msg.sender === "USER");

        prompt = prompt + "\n" + msg.msg;

        return;
      });

      console.log(prompt);

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

      newMessage.push({
        sender: "BOT",
        msg: data.candidates[0].content.parts[0].text,
      });

      setMessages(newMessage);
      doReRender(Math.random());

      console.log(newMessage);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to build the prompt with previous messages
  function buildPrompt(previousMessages, prompt) {
    let combinedPrompt = "";
    // Combine previous messages into a single string
    if (previousMessages && previousMessages.length > 0) {
      combinedPrompt = previousMessages.join("\n"); // Separate messages with newlines
    }

    // Add your desired prompt after the previous messages
    combinedPrompt += "\n" + prompt; // Replace "Hey there man." with your actual prompt

    return combinedPrompt;
  }

  const handleChatbotSubmit = async (e) => {
    e.preventDefault();
    let newMessage = messages;
    console.log(newMessage);
    newMessage.push({ sender: "USER", msg: prompt });
    console.log(newMessage);

    setMessages(newMessage);

    doReRender(Math.random());
    await fetchData(messages, prompt);
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-end justify-end z-50 mb-4 mr-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-xl">
          <button
            className="btn btn-ghost absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setOpenChatbot(false)}
          >
            ✕
          </button>
          <article className="min-h-20">
            {messages.map((message) => {
              if (message.sender === "BOT") {
                return (
                  <div className="chat chat-start">
                    <div className="chat-bubble">{message.msg}</div>
                  </div>
                );
              } else if (message.sender === "USER") {
                return (
                  <div className="chat chat-end">
                    <div className="chat-bubble">{message.msg}</div>
                  </div>
                );
              }
            })}
          </article>
          {/* Input area */}
          <form
            onSubmit={handleChatbotSubmit}
            className="flex justify-between items-center mt-6"
          >
            <input
              type="text"
              placeholder="How can I help?"
              className="input input-bordered w-full max-w-xs"
              value={prompt}
              onChange={onPromptChange}
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="26.25"
                viewBox="0 0 448 512"
                className="cursor-pointer"
              >
                <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8l176 0 0 176c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
