import dynamic from "next/dynamic";
export const AvatarPicker = dynamic(() => import("./AvatarPickerClient"));
