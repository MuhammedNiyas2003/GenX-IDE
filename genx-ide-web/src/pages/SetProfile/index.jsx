import "./style.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//adobe spectrum
import { DropZone } from "@react-spectrum/dropzone";
import { FileTrigger } from "react-aria-components";
import {
  Button,
  Content,
  Heading,
  IllustratedMessage,
  Text,
} from "@adobe/react-spectrum";

const SetProfile = () => {
  const [isFilled, setIsFilled] = useState(false);

  const navigate = useNavigate()

  return (
    <div className="setprofile-container">
      <div className="setprofile-card">
        <DropZone
        marginBottom={20}
          maxWidth="size-3000"
          isFilled={isFilled}
          onDrop={() => setIsFilled(true)}
        >
          <IllustratedMessage>
            {/* <Upload /> */}
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
          <Button  onPress={()=>navigate(-1)} marginX={10} variant="overBackground">
            Back
          </Button>
          {isFilled && (
            <Button onPress={()=>navigate('/login')} marginX={10} variant="accent">
              Upload
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetProfile;
