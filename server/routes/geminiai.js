import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const router = express.Router();

router.post("/convert-code", async (req, res) => {
  const { source, sourceCode, destination } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `convet ${source} to ${destination} the code ${sourceCode},Only respond with code as plain text without code block syntax around it. `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    if (text) {
      res.json({
        status: "SUCCESS",
        data: text,
      });
    }
  } catch (err) {
    console.log("error here", err.message);
    res.json({
      status: "FAILED",
      err: err.message,
    });
  }
});

router.post("/assistant", async (req, res) => {
    const { prompt } = req.body;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      if (text) {
        res.json({
          status: "SUCCESS",
          data: text,
        });
      }
    } catch (err) {
      console.log("error here", err.message);
      res.json({
        status: "FAILED",
        err: err.message,
      });
    }
  });


export default router;
