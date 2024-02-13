import axios from "axios";
<<<<<<< Updated upstream
=======
import dotenv from "dotenv";

dotenv.config();
>>>>>>> Stashed changes

const codeConverter = async (req, res) => {
  const { source, sourceCode, destination } = req.body;
  // const source = "javascript";
  // const destination = "python";
  // const code = 'console.error("hi)"';
<<<<<<< Updated upstream
  const API_KEY = "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";
=======
  const API_KEY = "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";
  console.log(process.env.OPENAI_API_KEY);
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
      const generatedCode = response.data.choices[0].message.content
    console.log(generatedCode);
    console.log(response.data.usage);
    res.send(generatedCode)
=======
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const generatedCode = response.data.choices[0].message.content;
    console.log(generatedCode);
    console.log(response.data.usage);
    res.send(generatedCode);
>>>>>>> Stashed changes
  } catch (err) {
    console.log("error here", err.response.data);
    return;
  }
};

export { codeConverter };
