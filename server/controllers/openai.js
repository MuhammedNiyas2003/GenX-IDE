import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const codeConverter = async (req, res) => {
  const { source, sourceCode, destination } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `convet ${source} to ${destination} the code ${sourceCode},Only respond with code as plain text without code block syntax around it. `,
          },
        ],
        max_tokens: 500,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const generatedCode = response.data.choices[0].message.content;
    console.log(generatedCode);
    console.log(response.data.usage);
    res.send(generatedCode);
  } catch (err) {
    console.log("error here", err.response.data);
    res.send(err.response.data);
    return;
  }
};

export { codeConverter };
