"use client";
export function TikTokEmbed({ embedLink }: { embedLink: string }) {
  return (
    <div>
      <blockquote
        className="tiktok-embed"
        cite="https://www.tiktok.com/@cake6061/video/7358519453526658346?utm_campaign=tt4d_open_api&utm_source=awpeniw4v19piu19"
        data-video-id="7358519453526658346"
        data-embed-from="oembed"
        style={{
          maxWidth: "605px",
          minWidth: "325px",
        }}
      ></blockquote>
      <script async src="https://www.tiktok.com/embed.js"></script>
    </div>
  );
}
