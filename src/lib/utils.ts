import { auth } from "@clerk/nextjs/server";

export const getRole = async () => {
  const { sessionClaims } = await auth();
  return (sessionClaims?.metadata as { role?: string })?.role;
};

export const getUserId = async () => {
  const { userId } = await auth();
  return userId;
};

export function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}
