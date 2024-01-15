import axios from "axios";

const submitCode = async (req, res) => {
  let submitId = "";
  const { code } = req.body;
  try {
    const response = await axios.post(
      "https://codejudge.geeksforgeeks.org/submit-request",
      {
        code,
        input: "",
        language: "js",
        save: false,
      }
    );

    const { submission_id } = response.data;
    console.log(response.data);
    submitId = submission_id;

    const checkStatus = async () => {
      try {
        const statusResponse = await axios.get(
          `https://codejudge.geeksforgeeks.org/get-status/${submitId}`
        );
        const { status } = statusResponse.data;

        // Check if compilation is complete
        if (status === "SUCCESS") {
          const compileResponse = {
            status,
            output: statusResponse.data.output,
            error: statusResponse.data.rntError,
            code
          };
          console.log("Compilation completed:", compileResponse);
          res.json({ compileResponse });
        } else if (status === "in-queue") {
          // If still queued, continue checking
          console.log(status);
          setTimeout(checkStatus, 1000);
        } else {
          console.error("Compilation failed:", statusResponse.data);
        }
      } catch (error) {
        console.error("Error checking compilation status:", error);
      }
    };

    // Start checking the status
    checkStatus();
  } catch (error) {
    console.error("Error compiling code:", error);
  }
};

export { submitCode };
