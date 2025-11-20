import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/write/:path*", "/settings/:path*", "/my-posts/:path*", "/feed/:path*"],
};