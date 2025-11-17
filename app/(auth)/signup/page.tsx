import { Metadata } from "next";
import SignUpForm from "../../components/auth/SignupForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up | Lumen Yard",
  description: "Create your Lumen Yard account",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
       
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 group mb-6">
            <div className="h-12 w-12 rounded-full bg-yellow-800 flex items-center justify-center font-bold text-white text-lg">
              LY
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Join Lumen Yard
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Share your stories with the world
          </p>
        </div>

        {/* Form */}
        <SignUpForm />

        {/* Footer Links */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-yellow-700 hover:text-yellow-800 transition"
            >
              Sign in
            </Link>
          </p>
          <Link
            href="/"
            className="block text-sm text-gray-500 hover:text-gray-700 transition"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}