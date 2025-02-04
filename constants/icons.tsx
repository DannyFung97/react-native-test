import { RouteName } from "@/components/TabBar";
import { FontAwesome6, Octicons, FontAwesome } from "@expo/vector-icons";
const primaryColor = "#673ab7";
const secondaryColor = "#222";
export const icons: Record<RouteName, (props: any) => JSX.Element> = {
  index: (props: any) => (
    <FontAwesome6 name="tv" size={24} color={secondaryColor} {...props} />
  ),
  "(screens)/Tab1": (props: any) => (
    <Octicons name="video" size={26} color={secondaryColor} {...props} />
  ),
  "(screens)/Profile": (props: any) => (
    <FontAwesome name="user" size={26} color={secondaryColor} {...props} />
  ),
};
