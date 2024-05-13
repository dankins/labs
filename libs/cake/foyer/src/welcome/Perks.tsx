import { motion } from "framer-motion";
import {
  ArrowDownIcon,
  CircleButton,
  Heading3,
  Text,
} from "@danklabs/pattern-library/core";

export function Perks({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <Heading3>Membership gives you:</Heading3>
      <Perk delay={2}>Special Access</Perk>
      <Perk delay={3}>Insider Experiences</Perk>
      <Perk delay={4}>Cake Cards to spend on your favorite brands</Perk>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2.5,
          }}
        >
          <CircleButton
            onClick={onClick}
            size="lg"
            icon={<ArrowDownIcon />}
          ></CircleButton>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Perk({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1 }}
      className="flex flex-col items-center gap-2"
    >
      <Heart />
      <Text uppercase face="sans">
        {children}
      </Text>
    </motion.div>
  );
}

export function Heart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
    >
      <path
        d="M0.945019 6.76334C0.791656 6.63827 0.7629 6.45548 0.753315 6.27269C0.78207 6.30155 0.810826 6.33041 0.849167 6.35927C0.96419 6.24382 0.887507 6.11875 0.829995 6.03217C0.782069 5.9552 0.753314 5.88786 0.734143 5.81089C0.686217 5.58962 0.61912 5.37796 0.590365 5.15668C0.552024 4.93541 0.552023 4.70451 0.523267 4.48324C0.513682 4.35817 0.484926 4.2331 0.475341 4.10803C0.475341 4.07917 0.456173 4.04069 0.465758 4.01183C0.513684 3.87714 0.494512 3.75207 0.494512 3.61738C0.504098 3.22293 0.532852 2.82848 0.571193 2.44365C0.609534 2.03958 0.686216 1.64514 0.85875 1.27955C0.954602 1.06789 1.11755 0.885102 1.27091 0.71193C1.64474 0.298241 2.10483 0.0577241 2.67994 0.0481034C2.92916 0.0481034 3.17837 0.0288632 3.42759 0.0192425C3.54261 0.0192425 3.64805 0.0288609 3.73432 0.125068C3.76307 0.16355 3.82059 0.182793 3.86851 0.192414C4.06022 0.192414 4.24233 0.279 4.43404 0.202035C4.51072 0.173173 4.59699 0.182794 4.63533 0.298242C4.66409 0.375207 4.74077 0.404068 4.79828 0.375206C4.94206 0.307861 5.06667 0.394449 5.1721 0.442552C5.68012 0.683069 6.1498 0.98131 6.60989 1.29879C6.62906 1.31803 6.64823 1.32765 6.6674 1.3469C6.9262 1.57779 7.20417 1.79907 7.45339 2.03959C7.7697 2.34745 8.05726 2.66493 8.31606 3.02089C8.42149 3.17482 8.54611 3.30951 8.6803 3.47307C8.79532 3.30951 8.91035 3.17482 8.99661 3.03051C9.37044 2.36669 9.85928 1.80869 10.3961 1.28917C10.5111 1.18334 10.6453 1.09676 10.7699 1.00055C10.952 0.865861 11.1341 0.731171 11.3258 0.606102C11.6421 0.394447 12.016 0.317483 12.3802 0.202035C12.7732 0.076966 13.1854 0.0384821 13.5975 0.0384821C13.7605 0.0384821 13.9138 0.00962068 14.0768 0C14.3068 0 14.5465 0 14.7765 0C14.834 0 14.8915 0.028862 14.9395 0.0481034C15.2174 0.182793 15.4954 0.327103 15.7638 0.471413C16.0513 0.615723 16.2814 0.846619 16.4827 1.08714C16.6265 1.25069 16.7606 1.42386 16.8757 1.60666C16.9811 1.77021 17.0578 1.94338 17.1441 2.11655C17.3645 2.511 17.422 2.95355 17.4987 3.3961C17.5658 3.81941 17.537 4.2331 17.47 4.65641C17.4316 4.91617 17.3837 5.17593 17.3358 5.42607C17.1728 6.19572 17.0099 6.97499 16.6265 7.6773C16.3006 8.26416 15.9842 8.85102 15.6488 9.43789C15.5241 9.65916 15.3708 9.8612 15.2366 10.0729C15.1599 10.1979 15.0928 10.323 15.0257 10.4384C14.8148 10.8233 14.5752 11.1792 14.2589 11.4967C14.0576 11.6987 13.9042 11.9393 13.7221 12.1509C13.5879 12.3049 13.425 12.4299 13.31 12.5838C13.1183 12.8436 12.8499 13.0264 12.639 13.2573C12.3994 13.5171 12.1501 13.7576 11.9105 14.0077C11.7188 14.2097 11.5367 14.431 11.345 14.6331C10.8753 15.1237 10.3673 15.5759 9.7826 15.9318C9.58131 16.0569 9.24583 15.9992 9.07329 15.8453C8.91034 15.701 8.73781 15.5759 8.55569 15.4604C8.32564 15.3065 8.08601 15.1814 7.85597 15.0275C7.60675 14.8736 7.36712 14.71 7.1179 14.5465C7.17541 14.5561 7.23293 14.5561 7.27127 14.585C7.61634 14.787 7.96141 14.9986 8.30647 15.2007C8.40872 15.2841 8.51735 15.3193 8.63237 15.3065C8.49818 15.2488 8.41191 15.2103 8.32565 15.1814C8.20104 15.0852 8.07643 14.989 7.95182 14.9024C7.65468 14.7004 7.36712 14.4984 7.06998 14.306C7.00288 14.2579 6.9262 14.229 6.85911 14.1905C6.79201 14.027 6.6674 13.9307 6.50445 13.8826C6.4086 13.6806 6.22648 13.5748 6.06353 13.4401C5.71846 13.1419 5.35422 12.8725 5.02832 12.5646C4.71201 12.2664 4.41487 11.9489 4.12732 11.6122C3.75349 11.1792 3.39884 10.7271 3.05377 10.2845C2.82372 9.98627 2.58409 9.68803 2.3828 9.37055C2.16234 9.0242 1.98023 8.65861 1.77894 8.29303C1.66391 8.08137 1.55848 7.8601 1.44345 7.64844C1.42428 7.60996 1.37636 7.54261 1.3476 7.55224C1.20382 7.5811 1.18465 7.47527 1.14631 7.37906C1.0888 7.22513 1.04087 7.08082 0.983357 6.92689C1.05045 7.03272 1.12714 7.13855 1.20382 7.26361C1.23258 7.05196 1.12714 6.84031 0.945019 6.72486V6.76334ZM3.37008 5.09896C3.38286 5.18875 3.4212 5.2561 3.48511 5.30099C3.48511 5.23365 3.46593 5.15669 3.46593 5.08934C3.60013 5.14707 3.57137 5.29137 3.62888 5.38758C3.80142 5.6762 3.97395 5.9552 4.14648 6.24382C4.19441 6.33041 4.26151 6.41699 4.2711 6.54206C4.21358 6.52282 4.18483 6.5132 4.1369 6.48434C4.17524 6.55169 4.18483 6.60941 4.23275 6.64789C4.30943 6.70561 4.34777 6.78258 4.40528 6.84993C4.51072 7.00386 4.62575 7.14817 4.84621 7.13855C4.94206 7.13855 5.00915 7.20589 5.07625 7.28286C4.88455 7.43679 4.70243 7.40792 4.52031 7.31172C4.29026 7.18665 4.06022 7.08082 3.89727 6.85954C3.86851 6.82106 3.82059 6.7922 3.78224 6.76334C3.65764 6.68637 3.56178 6.59017 3.52344 6.44586C3.50427 6.36889 3.45635 6.30154 3.37008 6.26306C3.14962 6.17648 3.00584 5.98407 3.01543 5.76279C3.01543 5.55114 2.80455 5.49341 2.79497 5.32024C2.63202 5.21441 2.46907 5.09896 2.4499 4.8873C2.24861 4.65641 2.13359 4.38703 2.04732 4.09841C2.02815 4.03107 1.94188 3.96372 1.95147 3.906C1.97064 3.80017 1.93229 3.71358 1.89395 3.61738C1.81727 3.38648 1.7981 3.15558 1.84603 2.92469C1.92271 2.58796 2.01857 2.26086 2.11442 1.92414C2.15276 1.79907 2.23902 1.68362 2.15276 1.53931C2.13359 1.52007 2.15276 1.47196 2.15276 1.4431C2.21985 1.28917 2.29653 1.14486 2.37321 1.00055C2.39239 0.962068 2.44031 0.933205 2.48824 0.904343C2.59368 0.846619 2.67995 0.760034 2.81414 0.731172C2.91958 0.711931 2.99626 0.586862 3.11128 0.481034C3.02501 0.471413 2.95792 0.44255 2.89082 0.461792C2.49783 0.538757 2.13359 0.683068 1.91313 1.05827C1.84603 1.1641 1.76935 1.26993 1.68308 1.35652C1.54889 1.50083 1.49138 1.66438 1.44345 1.84717C1.42428 1.94338 1.38594 2.03958 1.38594 2.14541C1.36677 2.49176 1.22299 2.8381 1.29967 3.19407C1.31884 3.29027 1.29967 3.3961 1.29967 3.49231C1.23258 3.94448 1.27092 4.39665 1.3476 4.84883C1.45304 5.42607 1.57764 6.00331 1.81727 6.54206C2.00898 6.96537 2.1911 7.38868 2.39239 7.80237C2.55534 8.12947 2.74704 8.42772 2.90999 8.75482C3.06335 9.05306 3.24547 9.33206 3.47552 9.5822C3.60971 9.72651 3.71515 9.89968 3.83017 10.0729C3.85893 10.1113 3.83017 10.1883 3.82059 10.2556C4.04105 10.2749 4.15607 10.4769 4.29026 10.6309C4.47238 10.8425 4.64492 11.083 4.83662 11.2851C5.21044 11.6891 5.60344 12.0836 5.98685 12.478C6.07311 12.5646 6.1498 12.6512 6.23607 12.7282C6.59072 13.0264 6.94537 13.315 7.30961 13.6036C7.38629 13.671 7.46297 13.7287 7.53966 13.7961C7.7026 13.9211 7.87514 14.0462 8.0285 14.1809C8.23938 14.3829 8.47901 14.5368 8.78574 14.6715C8.72822 14.5368 8.72823 14.431 8.63237 14.3541C8.52694 14.2675 8.44067 14.152 8.3544 14.0366C8.26813 13.9211 8.19145 13.7768 8.0956 13.671C7.8368 13.3727 7.61634 13.0553 7.3192 12.7859C7.01247 12.5069 6.76325 12.1702 6.49486 11.8527C6.33191 11.6506 6.18814 11.439 6.03477 11.2273C6.0156 11.1985 6.00602 11.1407 6.0156 11.1215C6.10187 11.0061 6.0156 10.9676 5.93892 10.958C5.86224 10.958 5.81431 10.9195 5.77597 10.8618C5.64178 10.6597 5.498 10.4577 5.36381 10.2653C5.35422 10.246 5.34464 10.2172 5.34464 10.1979C5.34464 10.0729 5.33505 9.97664 5.16252 10.0151C5.13376 10.0151 5.08584 9.95741 5.06667 9.9093C4.93247 9.67841 4.76953 9.46675 4.60658 9.2551C4.5299 9.14927 4.45321 9.0242 4.43404 8.89913C4.40528 8.73558 4.34778 8.62013 4.204 8.56241C4.18483 8.29303 4.26151 8.05251 4.37653 7.83124C4.42446 7.74465 4.41487 7.6292 4.55865 7.6292C4.6545 7.6292 4.75994 7.5811 4.84621 7.60034C5.14335 7.68692 5.41173 7.83124 5.63219 8.05251C5.80473 8.22568 5.97726 8.39885 6.1498 8.57202C6.19772 8.62013 6.24565 8.649 6.29358 8.6971C6.25524 8.52393 6.20731 8.34113 6.11145 8.20644C5.89099 7.9082 5.78556 7.56185 5.67054 7.22513C5.65137 7.16741 5.65136 7.09044 5.65136 7.0231C5.67054 6.88841 5.62261 6.78258 5.53634 6.67676C5.21044 6.29193 4.89413 5.9071 4.57782 5.51265C4.47238 5.38758 4.38612 5.26252 4.2711 5.13745C4.00271 4.84883 3.73432 4.5602 3.57137 4.19462C3.56178 4.16576 3.50428 4.14651 3.48511 4.11765C3.37008 3.96372 3.23589 3.81941 3.26465 3.60776C3.2934 3.38648 3.24547 3.29989 3.0346 3.17482C2.98667 3.28065 2.98667 3.37686 3.01543 3.48269C3.07294 3.70396 3.12087 3.92524 3.17838 4.14651C3.24547 4.35817 3.24547 4.58906 3.33174 4.7911H3.2263C3.24547 4.91617 3.33174 4.99314 3.37966 5.08934L3.37008 5.09896ZM16.243 2.26086C16.2047 2.02996 16.1089 1.83755 15.9651 1.674C15.9267 1.62589 15.8596 1.60666 15.8309 1.55855C15.6679 1.26993 15.4283 1.0679 15.1695 0.885104C14.8532 0.654208 14.5081 0.481035 14.096 0.586862C14.0193 0.606104 13.933 0.596483 13.8467 0.586862C13.1949 0.558 12.5623 0.68307 11.9872 0.981311C11.3737 1.29879 10.837 1.73172 10.3769 2.26086C10.1181 2.5591 9.89762 2.89583 9.62923 3.17482C9.48546 3.32876 9.46628 3.55965 9.27458 3.66548C9.28417 3.81941 9.14997 3.89638 9.08288 4.03106C9.14997 4.11765 9.21707 4.20424 9.29375 4.30045C9.34168 4.25234 9.36085 4.22348 9.38002 4.20424C9.74426 3.65586 10.1564 3.13634 10.674 2.72265C10.8561 2.57834 11.0287 2.42441 11.2204 2.29934C11.575 2.05883 11.9393 1.83755 12.2939 1.60666C12.4952 1.48159 12.6869 1.34689 12.917 1.28917C13.0416 1.26031 13.1662 1.24107 13.2812 1.19296C13.6263 1.05827 13.9618 1.02941 14.3356 1.03903C14.6902 1.03903 14.9682 1.22183 15.2653 1.36614C15.3708 1.41424 15.4666 1.4912 15.5433 1.56817C15.7734 1.78945 16.0034 2.02034 16.2526 2.25124L16.243 2.26086ZM13.1374 4.464C13.1662 4.47362 13.1854 4.48324 13.2141 4.49286C13.2333 4.44476 13.2716 4.39665 13.2716 4.34855C13.2716 3.906 13.2716 3.46344 13.1566 3.02089C13.1278 2.92469 13.0895 2.8381 13.0416 2.71303C12.8499 2.82848 12.6773 2.90545 12.524 3.02089C12.4473 3.07862 12.361 3.18444 12.409 3.29989C12.4473 3.38648 12.4665 3.51155 12.6198 3.45382C12.639 3.45382 12.6773 3.48269 12.6869 3.50193C12.7444 3.63662 12.8499 3.66548 12.9649 3.63662C12.9936 3.7232 13.0128 3.83865 13.0512 3.84827C13.2908 3.87713 13.2045 4.04069 13.1949 4.16575C13.1949 4.26196 13.1662 4.35817 13.147 4.45437L13.1374 4.464ZM14.9778 8.81254C15.5817 7.81199 16.1664 6.80182 16.3389 5.61848C15.9171 6.696 15.3516 7.71578 14.9778 8.81254ZM8.08601 11.0253C8.26813 11.2947 8.49818 11.5063 8.76656 11.7276C8.76656 11.6122 8.75698 11.5448 8.75698 11.4775C8.75698 11.3043 8.75698 11.2658 8.62279 11.2177C8.45025 11.1504 8.26813 11.0926 8.08601 11.0349V11.0253ZM1.33801 1.0679C1.25174 1.14486 1.16548 1.20258 1.22299 1.33727C1.30925 1.26031 1.39552 1.21221 1.33801 1.0679ZM9.5238 15.2199C9.5909 15.143 9.61965 15.1141 9.64841 15.0756C9.61965 15.0564 9.5909 15.0179 9.57173 15.0275C9.53338 15.0467 9.49504 15.0756 9.47587 15.1141C9.47587 15.1333 9.49504 15.1718 9.5238 15.2199ZM9.05412 8.59127C9.09246 8.64899 9.11163 8.68748 9.14039 8.70672C9.16915 8.72596 9.20748 8.71634 9.24582 8.70672C9.25541 8.70672 9.27458 8.65862 9.265 8.649C9.25541 8.62975 9.22666 8.60089 9.1979 8.60089C9.15956 8.60089 9.12122 8.60089 9.05412 8.60089V8.59127ZM9.41836 3.01127C9.40877 3.00165 9.38961 2.99203 9.38002 2.98241C9.3321 3.03051 9.265 3.05938 9.30334 3.20369C9.36085 3.1171 9.3896 3.069 9.41836 3.01127ZM9.1308 14.8062C9.10205 14.8447 9.07329 14.8736 9.07329 14.8928C9.07329 14.9121 9.11163 14.9409 9.14039 14.9409C9.15956 14.9409 9.17873 14.9121 9.1979 14.8928C9.17873 14.8736 9.15956 14.8447 9.1308 14.8062ZM3.83976 5.92634C3.83017 5.92634 3.811 5.94558 3.80142 5.9552C3.83017 5.99369 3.86851 6.04179 3.89727 6.08027C3.90685 6.08027 3.91644 6.07065 3.92602 6.06103C3.89727 6.02255 3.86852 5.97444 3.83976 5.93596V5.92634ZM2.93875 0.913965C2.90999 0.942827 2.89082 0.971688 2.88124 1.00055C2.88124 1.00055 2.91958 1.03903 2.92916 1.03903C2.95792 1.01979 2.97708 1.00055 2.99625 0.971689C2.99625 0.971689 2.9675 0.942827 2.94833 0.913965H2.93875Z"
        fill="#292725"
      />
    </svg>
  );
}
