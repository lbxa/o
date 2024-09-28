import { InvitationStatus } from "../types/graphql";

export const convertToInvitationStatus = (status: string): InvitationStatus => {
  const uppercaseStatus = status.toUpperCase();
  if (
    Object.values(InvitationStatus).includes(
      uppercaseStatus as InvitationStatus
    )
  ) {
    return uppercaseStatus as InvitationStatus;
  }
  throw new Error(`Invalid InvitationStatus: ${status}`);
};
