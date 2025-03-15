import CameraIcon from "@assets/icons/camera.svg";
import ImageIcon from "@assets/icons/image.svg";
import TrashIcon from "@assets/icons/trash.svg";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import classNames from "classnames";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import { Image, View } from "react-native";

import { useSharedBottomSheetProps } from "@/shared";
import { OText } from "@/universe/atoms";
import { useOTheme } from "@/utils";

import { OTouchable } from "../OTouchable";

export interface MultiResolutionImageUploadResult {
  key: string;
  original: string;
  high: string;
  med: string;
  low: string;
}

interface OImageUploadProps {
  size?: number;
  iconSize?: number;
  style?: "rounded" | "full-width";
  iconColor?: string;
  className?: string;
  footerDisclaimer?: string;
  onUpload?: (uri: string) => Promise<void> | void;
  onDelete?: () => Promise<void>;
}

export function OImageUpload({
  size = 200,
  iconSize = 45,
  style = "rounded",
  className = "",
  footerDisclaimer,
  onUpload,
  onDelete,
}: OImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const modalRef = useRef<BottomSheetModal>(null);
  const sharedBottomSheetProps = useSharedBottomSheetProps();
  const { builtInColors, isDark } = useOTheme();

  const onAddImage = () => {
    modalRef.current?.close();
    void pickImage();
  };

  const onDeleteImage = () => {
    modalRef.current?.close();
    setImage(null);
    void onDelete?.();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await onUpload?.(result.assets[0].uri);
    }
  };

  return (
    <>
      <BottomSheetModal
        ref={modalRef}
        {...sharedBottomSheetProps}
        enablePanDownToClose
      >
        <BottomSheetView>
          <View className="flex flex-col gap-md px-md pb-12">
            <View className="flex flex-col gap-md">
              {onUpload && (
                <OTouchable
                  onPress={onAddImage}
                  className="flex flex-row items-center gap-md"
                >
                  <ImageIcon
                    width={20}
                    height={20}
                    fill={
                      isDark ? builtInColors.gray[200] : builtInColors.gray[500]
                    }
                  />
                  <OText size="lg">Add/edit photo</OText>
                </OTouchable>
              )}

              {onDelete && (
                <OTouchable
                  onPress={onDeleteImage}
                  className="mb-sm flex flex-row items-center gap-md"
                >
                  <TrashIcon
                    width={20}
                    height={20}
                    fill={
                      isDark ? builtInColors.red[500] : builtInColors.red[500]
                    }
                  />
                  <OText size="lg" className="text-red-700 dark:text-red-500">
                    Remove photo
                  </OText>
                </OTouchable>
              )}
            </View>
            {footerDisclaimer && (
              <OText gray className="text-sm">
                {footerDisclaimer}
              </OText>
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      <OTouchable
        onPress={() => modalRef.current?.present()}
        className={classNames(
          { "mx-auto rounded-full": style === "rounded" },
          "flex bg-gray-300 dark:bg-white/20",
          className
        )}
        style={
          style === "rounded"
            ? { width: size, height: size }
            : { width: "100%", height: 150 }
        }
      >
        {image ? (
          <Image
            source={{ uri: image }}
            className={classNames(
              { "rounded-full": style === "rounded" },
              "absolute inset-0"
            )}
            style={
              style === "rounded"
                ? { width: size, height: size }
                : { width: "100%", height: "100%" }
            }
            resizeMode="cover"
          />
        ) : (
          <View className="m-auto">
            <CameraIcon
              width={iconSize}
              height={iconSize}
              fill={isDark ? builtInColors.gray[300] : builtInColors.gray[500]}
            />
          </View>
        )}
      </OTouchable>
    </>
  );
}
