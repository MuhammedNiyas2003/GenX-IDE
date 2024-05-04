import { createSlice } from "@reduxjs/toolkit";

const defaultBubbleSortCode = `// Bubble sort Implementation using Javascript

// Creating the bblSort function
function bblSort(arr) {

    for (var i = 0; i < arr.length; i++) {

        // Last i elements are already in place 
        for (var j = 0; j < (arr.length - i - 1); j++) {

            // Checking if the item at present iteration 
            // is greater than the next iteration
            if (arr[j] > arr[j + 1]) {

                // If the condition is true
                // then swap them
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }

    // Print the sorted array
    console.log(arr);
}

// This is our unsorted array
var arr = [234, 43, 55, 63, 5, 6, 235, 547];

// Now pass this array to the bblSort() function
bblSort(arr);
`;

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    currentCode: defaultBubbleSortCode,
    currentFile: null,
    currentWorkspace: null,
    fileFolders: null,
  },
  reducers: {
    setCurrentCode: (state, action) => {
      state.currentCode = action.payload;
    },
    setCurrentWorkspace: (state, action) => {
      state.currentWorkspace = action.payload;
    },
    setFileFolder: (state, action) => {
      state.fileFolders = action.payload;
    },
    setCurrentFile: (state, action) => {
      state.currentFile = action.payload;
    },
    clearWorkspace: (state, action) => {
      state.currentCode = defaultBubbleSortCode;
      state.currentFile = null;
      state.currentWorkspace = null;
      state.fileFolders = null;
    },
  },
});

export const {
  setCurrentCode,
  setCurrentWorkspace,
  setFileFolder,
  setCurrentFile,
  clearWorkspace,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
