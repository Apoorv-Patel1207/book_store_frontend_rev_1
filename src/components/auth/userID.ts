import { useAuth0 } from "@auth0/auth0-react";

export const useUserID = () => {
  const { user, isAuthenticated } = useAuth0();
  return isAuthenticated && user?.sub;
};
