import { Button, View } from "@adobe/react-spectrum";

const NotificationItem = ({
  _id,
  type,
  onReject,
  onApprove,
  fromName,
  workspaceId,
}) => {
  return (
    <View key={_id} UNSAFE_style={{ margin: "1rem 0" }}>
      <p>{fromName} had invited you to become a member of</p>
      {type === "invite" && (
        <div style={{ margin: "1rem 0" }}>
          <Button size="L" onPress={onApprove} variant="accent">
            Approve
          </Button>
          <Button marginStart={10} onPress={onReject}>
            Reject
          </Button>
        </div>
      )}
    </View>
  );
};

export default NotificationItem;
