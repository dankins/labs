"use client";
import MuxPlayer from "@mux/mux-player-react";
import {
  ArrowDownIcon,
  CircleButton,
  Heading3,
  Text,
} from "@danklabs/pattern-library/core";

import style from "./Video.module.scss";

export function Video({
  playbackId,
  onClick,
}: {
  playbackId: string;
  onClick: () => void;
}) {
  function onEnded() {
    setTimeout(onClick, 1000);
  }
  return (
    <div className="h-[calc(100vh-80px]">
      <script
        type="module"
        src="https://cdn.jsdelivr.net/npm/@mux/mux-player/themes/microvideo.js/+esm"
      ></script>
      <MuxPlayer
        preload="metadata"
        autoPlay
        playbackId={playbackId}
        metadata={{ video_title: "CAKE Teaser" }}
        className={style.VideoPlayer}
        theme="microvideo"
        onEnded={onEnded}
      />
    </div>
  );
}
