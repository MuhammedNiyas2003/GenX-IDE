import { Excalidraw } from "@excalidraw/excalidraw";

const Drawer = () => {
  return (
    <div>
      <div style={{ height: "100%",width: '90vw' }}>
        <Excalidraw theme="dark" />
      </div>
    </div>
  );
};

export default Drawer;
