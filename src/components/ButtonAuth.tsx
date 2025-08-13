"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();
  console.log({ session, status });

  if (status === "loading") {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (session) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-gray-800">
          Signed in as <span className="font-semibold">{session.user?.email}</span>
        </p>
        <button
          onClick={() => signOut()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-800">Not signed in</p>
      <button
        onClick={() => signIn()}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
      >
        Sign in
      </button>
    </div>
  );
}
