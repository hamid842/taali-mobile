import { Redirect } from "expo-router";
import { useRoleRedirect } from "@hooks/use-role-redirect";
import { useAuth } from "@hooks/use-auth";

export default function PanelIndex() {
  const { user } = useAuth();
  const { getDashboardRoute } = useRoleRedirect();

  // If no user, redirect to login
  if (!user) {
    return <Redirect href="/login" />;
  }

  // Get the appropriate dashboard route based on user role
  const route = getDashboardRoute(user.role!);

  return <Redirect href={route} />;
}
