import axios from "axios";
import "./style.scss";
import { useEffect } from "react";

const Compiler = () => {
  useEffect(() => {
    const compiler = async () => {
      try {
        // Request body
        const requestBody = {
          code: "let a = 'faris'; console.log(a)",
          input: "",
          language: "js",
          save: false,
        };

        // Request headers
        const requestHeaders = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Headers": "content-type",
        };

        const res = await axios.post(
          "https://codejudge.geeksforgeeks.org/submit-request",
          requestBody,
          {
            headers: requestHeaders,
          }
        );

        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    compiler();
  }, []);

  return <div className="compiler-container">index</div>;
};

export default Compiler;
