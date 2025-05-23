import { Button } from "@/components/button/Button";
import { LoadingSVG } from "@/components/button/LoadingSVG";
import { useConfig } from "@/hooks/useConfig";
import { ConnectionState } from "livekit-client";
import { ReactNode } from "react";
import Image from "next/image";
import lkLogo from '../../assets/highiq_logo.png';

type PlaygroundHeaderProps = {
  logo?: ReactNode;
  title?: ReactNode;
  height: number;
  connectionState: ConnectionState;
  onConnectClicked: () => void;
};

export const PlaygroundHeader = ({
  logo,
  title,
  height,
  onConnectClicked,
  connectionState,
}: PlaygroundHeaderProps) => {
  const { config } = useConfig();

  return (
    <div className="flex gap-4 pt-4 justify-between items-center shrink-0" style={{ height: `${height}px` }}>
      <div className="flex items-center gap-3 basis-2/3">
        <a href="https://livekit.io">{logo ?? <LKLogo />}</a>
        <div className="lg:basis-1/2 lg:text-center text-xs lg:text-base lg:font-semibold text-white">
          {title}
        </div>
      </div>
      <div className="flex basis-1/3 justify-end items-center gap-2">
        <Button
          disabled={connectionState === ConnectionState.Connecting}
          onClick={onConnectClicked}
        >
          {connectionState === ConnectionState.Connecting ? <LoadingSVG /> : connectionState === ConnectionState.Connected ? "Disconnect" : "Connect"}
        </Button>
      </div>
    </div>
  );
};

const LKLogo = () => <Image src={lkLogo} alt="LK Logo" width={50} height={50} />;

