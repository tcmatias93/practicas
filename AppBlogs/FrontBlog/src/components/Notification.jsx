import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  const none = {
    display: "none",
  };
  return <div style={notification ? style : none}>{notification}</div>;
};

export default Notification;
