import { LogoIcon } from "@danklabs/cake/pattern-library/core";
import { invitations } from "@danklabs/cake/services/admin-service";
import dayjs from "dayjs";
import { ImageResponse } from "next/og";

export async function generateOpenGraphImage(code?: string) {
  let text = "Join Cake";
  let expiration: string | undefined = undefined;
  if (code) {
    const invite = await invitations.getByCode.cached(code);
    text = invite?.recipientName || code;
    expiration = dayjs(invite?.expiration).format("MMMM D, YYYY");
  }

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#F7F4EF",
          backgroundSize: "150px 150px",
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
          className="invert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="56"
            viewBox="0 0 200 56"
            fill="none"
          >
            <path
              d="M157.729 44.5493C157.729 50.005 156.643 53.6566 154.692 53.6566C153.288 53.6566 151.138 50.1443 149.486 47.3724L132.219 17.3102L132.928 16.4657C138.101 10.3743 148.488 1.55099 152.447 1.55099C155.169 1.55099 157.729 4.60579 157.729 11.4509V44.5493ZM61.8889 28.0001L68.519 11.8635C68.7753 12.448 69.2285 13.4569 69.4843 14.1257L75.4964 28.0001H61.8889ZM178.48 2.08957C190.863 2.08957 196.499 8.5253 199.83 20.0597H200V0.835732H153.679H150.043H130.793V1.00333C134.55 3.09253 137.368 9.445 131.39 16.3819L120.118 29.5043V11.4509C120.118 2.92546 123.534 1.75542 127.803 1.00333V0.835732H97.9145V1.00333C102.185 1.75542 105.6 2.92546 105.6 11.4509V44.5493C105.6 49.8011 105.116 53.3459 103.834 53.3459C102.686 53.3459 99.9694 48.4784 97.4094 42.7104L78.8298 0.836266H71.705H56.2481V1.00333C61.2863 2.34044 64.5312 4.43018 67.7767 10.5318L56.9315 37.2777C52.4905 48.227 49.2456 52.2389 45.4023 54.9969V55.1639H64.8732V54.9969C53.9663 54.6216 58.0429 39.1283 61.5442 29.0986L76.026 29.223L81.8669 42.7937C85.2831 50.5671 80.4151 54.4119 76.0604 54.9969V55.1639H106.103H127.803V54.9969C123.534 54.2448 120.118 53.0747 120.118 44.5493V31.3431L122.509 28.5851L137.453 55.1639H150.043H157.863H200V30.9257H199.83C197.439 42.7937 191.461 53.9106 179.932 53.9106C174.808 53.9106 172.246 52.155 172.246 44.2984V26.9971H173.612C181.64 26.9971 186.422 33.5167 187.703 40.3698H187.874V12.3701H187.703C186.422 19.2238 181.64 25.7433 173.612 25.7433H172.246V2.08957H178.48Z"
              fill="black"
            />
            <path
              d="M53.3105 27.9821C50.5591 39.6643 40.6988 45.4723 31.7728 45.3944C18.9135 45.2818 10.1624 36.8599 10.1624 19.6419C10.1624 9.19429 16.0546 1.58799 25.5337 1.58799C33.0489 1.58799 40.5636 6.68661 47.9076 21.7316H48.0782V4.09566C40.8199 1.25384 35.2691 3.8147e-06 28.7787 3.8147e-06C13.2367 3.8147e-06 0 11.869 0 29.0865C0 44.9669 11.3573 56 26.9855 56C42.2608 56 51.423 44.2617 54.2213 27.9821H53.3105Z"
              fill="black"
            />
          </svg>
        </div>
        <div
          style={{
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            color: "black",
            marginTop: 30,
            padding: "0 120px",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}
        >
          {text}
        </div>
        <div
          style={{
            fontSize: 30,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            color: "#EB3D19",
            marginTop: 30,
            padding: "0 120px",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}
        >
          {expiration && `Expires ${expiration}`}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
