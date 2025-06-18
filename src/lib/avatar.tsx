import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";

interface AvatarProps {
  seed: string;
  variant: "botttsNeutral" | "initials";
}

export const generateAvatarUrl = ({ seed, variant }: AvatarProps) => {
  let avatar;

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, { seed });
  } else {
    avatar = createAvatar(initials, { seed });
  }

  return avatar.toDataUri();
};
