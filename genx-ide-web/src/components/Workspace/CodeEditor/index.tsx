import "./style.css";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue='function bubbleSort(arr) {
        const len = arr.length;
      
        for (let i = 0; i < len - 1; i++) {
          // Last i elements are already sorted, no need to check them
          for (let j = 0; j < len - 1 - i; j++) {
            // Swap if the element found is greater than the next element
            if (arr[j] > arr[j + 1]) {
              const temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
            }
          }
        }
      
        return arr;
      }
      
      // Example usage:
      const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
      const sortedArray = bubbleSort(unsortedArray.slice()); // Clone array to avoid modifying the original
      console.log("Sorted array:", sortedArray);
      
      '
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
