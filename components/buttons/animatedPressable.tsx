import { MotiPressable } from "moti/interactions";
import { StyleProps } from "react-native-reanimated";
import { useHaptics } from "../../utils/haptics";

type AnimatedPressableProps = {
  onPress?: () => void;
  children?: JSX.Element | JSX.Element[];
  style?: StyleProps;
  bouncy?: boolean;
  minimal?: boolean;
  disabled?: boolean;
};

export const AnimatedPressable = ({
  onPress,
  style,
  children,
  bouncy,
  minimal,
  disabled,
}: AnimatedPressableProps) => {
  return (
    <MotiPressable
      onPress={() => {
        if (disabled) return;
        useHaptics("light");
        onPress && onPress();
      }}
      animate={({ pressed }) => {
        "worklet";
        if (disabled)
          return {
            scale: 1,
          };

        if (minimal) {
          return {
            scale: pressed ? 0.96 : 1,
          };
        }

        return {
          scale: pressed ? (bouncy ? 0.8 : 0.9) : 1,
        };
      }}
      transition={
        bouncy
          ? {
              type: "spring",
              stiffness: 400,
              mass: 0.5,
              damping: 8,
            }
          : {
              type: "timing",
              duration: 150,
            }
      }
      style={style}
    >
      {children}
    </MotiPressable>
  );
};
