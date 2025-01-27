import CameraIcon from "@assets/icons/camera.svg";
import classNames from "classnames";
import { View } from "react-native";

import { OTouchable } from "../OTouchable";

interface OImageUploadProps {
  size?: number;
  iconSize?: number;
  iconColor?: string;
  className?: string;
  onPress?: () => void;
}

export function OImageUpload({
  size = 200,
  iconSize = 45,
  iconColor = "grey",
  className = "",
  onPress,
}: OImageUploadProps) {
  return (
    <OTouchable
      onPress={onPress}
      className={classNames(
        "mx-auto flex rounded-full bg-gray-300 dark:bg-white/20",
        className
      )}
      style={{ width: size, height: size }}
    >
      <View className="m-auto">
        <CameraIcon width={iconSize} height={iconSize} fill={iconColor} />
      </View>
    </OTouchable>
  );
}
