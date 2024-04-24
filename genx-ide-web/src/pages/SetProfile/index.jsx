import "./style.scss";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//adobe spectrum
import { DropZone } from "@react-spectrum/dropzone";
import { ToastQueue } from "@react-spectrum/toast";
import { FileTrigger } from "react-aria-components";
import {
  Button,
  Content,
  Heading,
  IllustratedMessage,
  Text,
} from "@adobe/react-spectrum";
import axios from "axios";

const SetProfile = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [filledSrc, setFilledSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { state: formData } = useLocation();

  const registerHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/register`,
        formData
      );
      if (response.status === 200) {
        ToastQueue.positive("User registered!!", {
          timeout: 3000,
        });
        navigate("/login");
      }
    } catch (err) {
      const { status, data } = err.response;
      if (status === 409) {
        ToastQueue.negative(data, {
          timeout: 3000,
        });
        navigate("/");
      } else {
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="setprofile-container">
      <div className="setprofile-card">
        <DropZone
          marginBottom={20}
          maxWidth="size-3000"
          isFilled={!!filledSrc}
          onDrop={() => setIsFilled(true)}
        >
          <IllustratedMessage>
            <Heading>
              <Text slot="label">
                {isFilled ? "Image uploaded!" : "Upload profile image!"}
              </Text>
            </Heading>
            <Content>
              <FileTrigger onSelect={() => setIsFilled(true)}>
                {!isFilled && <Button variant="primary">Browse</Button>}
              </FileTrigger>
            </Content>
          </IllustratedMessage>
        </DropZone>
        <div className="setprofile-buttons">
          <Button
            onPress={() => navigate(-1)}
            marginX={10}
            variant="overBackground"
          >
            Back
          </Button>
          {isFilled && (
            <Button
              onPress={registerHandler}
              marginX={10}
              isPending={isLoading}
              variant="accent"
            >
              Upload
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetProfile;
