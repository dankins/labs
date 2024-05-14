"use client";

import { FormState, LeftArrow } from "@danklabs/pattern-library/core";
import { InputProps } from "libs/pattern-library/core/src/inputs/Input";
import React, { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";

const defaultAvatar =
  "https://placehold.co/480x480?text=Drag+Or+Click+To+Upload";

export function AvatarPickerClient({
  action,
}: {
  action(prevState: FormState): Promise<FormState>;
}) {
  const [hostName, setHostName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostName(window.location.origin);
    }
  }, []);
  const [image, setImage] = useState<File | undefined>(undefined);
  const editor = useRef<AvatarEditor>(null);
  const [scale, setScale] = useState(1.0);

  return (
    <div>
      <Dropzone
        onDrop={(dropped) => setImage(dropped[0])}
        noClick={image ? true : false}
        noKeyboard
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            {image ? (
              <>
                {" "}
                <AvatarEditor
                  ref={editor}
                  width={500}
                  height={500}
                  style={{ width: "100%", height: "100%" }}
                  image={image}
                  borderRadius={428}
                  scale={scale}
                />
                <RangeInput
                  label="Scale"
                  onChange={(e) => setScale(parseFloat(e.target.value) / 100)}
                  min={100}
                  max={250}
                />
              </>
            ) : (
              <img src={defaultAvatar} />
            )}

            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default AvatarPickerClient;

export const RangeInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { label, min, max, ...rest } = props;
    return (
      <div className="w-full my-5 mb-0">
        <label className="block tracking-wide text-xs font-bold mb-2 flex flex-row items-center">
          {props.label}
          {/* {props.tooltip && (
            <div
              className="ml-3 text-lg normal-case tooltip tooltip-right"
              data-tip={props.tooltip}
            >
              <LeftArrow />
            </div>
          )} */}
        </label>
        <input
          type="range"
          className="range range-xs range-secondary w-full"
          ref={ref}
          min={min}
          max={max}
          {...rest}
        />
        {/* {error && (
          <p className="text-red-500 text-xs italic">{error.message}</p>
        )} */}
      </div>
    );
  }
);
