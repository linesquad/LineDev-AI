import Link from "next/link";
import Image from "next/image";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

interface CallActiveProps {
  onLeave: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: CallActiveProps) => {
  return (
    <div className="flex flex-col justify-between p-4 h-full text-white">
      <div className="bg-[#101213] rounded-full p-4 items-center gap-4">
        <Link
          href={"/"}
          className="flex items-center justify-center p-1 bg-white/10 rounded-full w-fit"
        >
          <Image src={"/logo.svg"} alt="logo" width={32} height={32} />
        </Link>
        <h4 className="text-base">{meetingName}</h4>
      </div>
      <SpeakerLayout />
      <div className="bg-[#101213] rounded-full px-4 ">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};
