import { useLocalSearchParams } from "expo-router";

const ChannelPage = () => {
  const { slug } = useLocalSearchParams();
  return <div>Channel: {slug}</div>;
};

export default ChannelPage;
