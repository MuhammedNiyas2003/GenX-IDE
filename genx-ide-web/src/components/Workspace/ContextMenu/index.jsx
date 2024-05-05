import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeContext } from "../../../state/reducers/contextMenuSlice";
import {
  ActionButton,
  AlertDialog,
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Form,
  Heading,
  Text,
  TextField,
} from "@adobe/react-spectrum";
import { ToastQueue } from "@react-spectrum/toast";
import axios from "axios";
import { setFileFolder } from "../../../state/reducers/workspaceSlice";

const ContextMenu = () => {
  const { x, y, isVisible, selectedItem } = useSelector(
    (state) => state.contextMenu
  );
  const { _id: workspaceId } = useSelector(
    (state) => state.workspace.currentWorkspace
  );
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handlerClose = () => {
    dispatch(closeContext());
  };
  useEffect(() => {
    window.addEventListener("mousedown", () => {
      window.addEventListener("click", handlerClose);
      return () => {
        window.removeEventListener("click", handlerClose);
      };
    });
  }, []);

  // fileFolder actions
  const createFileFolder = async (e, element, type) => {
    e.preventDefault();
    console.log(type);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/file-folder/create`,
        {
          name,
          type,
          workspaceId,
          parentId: element.id,
          code: "",
        }
      );
      const { status, data } = response.data;
      if (status === "SUCCESS") {
        dispatch(setFileFolder(data));
        ToastQueue.info(`${type} created`, {
          timeout: 3000,
        });
        setTimeout(() => {
          handlerClose();
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteFileFolder = async ({ id: elementId }) => {
    console.log(elementId);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/file-folder/${elementId}`
      );
      const { status, data } = response;
      if (status === 202) {
        ToastQueue.negative(data, {
          timeout: 3000,
        });
        setTimeout(() => {
          handlerClose();
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const renameFileFolder = () => {};

  if (isVisible)
    return (
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "400px",
          backgroundColor: "grey",
          borderRadius: "5px",
          zIndex: 99,
          left: x,
          top: y,
        }}
      >
        <p>{selectedItem?.id}</p>
        {selectedItem?.type === "folder" && (
          <>
            <DialogTrigger>
              <ActionButton isQuiet>new file</ActionButton>
              {(close) => (
                <Dialog width={400}>
                  <Heading>
                    <Flex alignItems="center" gap="size-100">
                      <Text>Create new file</Text>
                    </Flex>
                  </Heading>
                  <Divider />
                  <Content>
                    <Form>
                      <TextField
                        onChange={(text) => setName(text)}
                        label="First Name"
                        autoFocus
                      />
                    </Form>
                  </Content>
                  <ButtonGroup>
                    <Button variant="secondary" onPress={close}>
                      Cancel
                    </Button>
                    <Button
                      isPending={isLoading}
                      onClick={(e) => {
                        createFileFolder(e, selectedItem, "file");
                        close();
                      }}
                      variant="accent"
                    >
                      Create
                    </Button>
                  </ButtonGroup>
                </Dialog>
              )}
            </DialogTrigger>
            <DialogTrigger>
              <ActionButton isQuiet>new folder</ActionButton>
              {(close) => (
                <Dialog width={400}>
                  <Heading>
                    <Flex alignItems="center" gap="size-100">
                      <Text>new folder</Text>
                    </Flex>
                  </Heading>
                  <Divider />
                  <Content>
                    <Form>
                      <TextField
                        onChange={(text) => setName(text)}
                        label="First Name"
                        autoFocus
                      />
                    </Form>
                  </Content>
                  <ButtonGroup>
                    <Button variant="secondary" onPress={close}>
                      Cancel
                    </Button>
                    <Button
                      isPending={isLoading}
                      onClick={(e) => {
                        createFileFolder(e, selectedItem, "folder");
                        close();
                      }}
                      variant="accent"
                    >
                      Create
                    </Button>
                  </ButtonGroup>
                </Dialog>
              )}
            </DialogTrigger>
          </>
        )}
        <DialogTrigger>
          <ActionButton isQuiet>rename</ActionButton>
          {(close) => (
            <Dialog width={400}>
              <Heading>
                <Flex alignItems="center" gap="size-100">
                  <Text>Rename</Text>
                </Flex>
              </Heading>
              <Divider />
              <Content>
                <Form>
                  <TextField
                    onChange={(text) => setName(text)}
                    label="First Name"
                    autoFocus
                  />
                </Form>
              </Content>
              <ButtonGroup>
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
                <Button
                  isPending={isLoading}
                  onClick={(e) => {
                    renameFileFolder(selectedItem);
                    close();
                  }}
                  variant="accent"
                >
                  Rename
                </Button>
              </ButtonGroup>
            </Dialog>
          )}
        </DialogTrigger>
        <DialogTrigger>
          <ActionButton isQuiet>Delete</ActionButton>
          <AlertDialog
            variant="destructive"
            title={`Delete ${selectedItem?.type}`}
            primaryActionLabel="Delete"
            onPrimaryAction={() => deleteFileFolder(selectedItem)}
            cancelLabel="Cancel"
            autoFocusButton="primary"
          >
            Confirmation Required: Delete File or Folder – Proceed with Deletion?
          </AlertDialog>
        </DialogTrigger>
      </div>
    );
};
export default ContextMenu;
