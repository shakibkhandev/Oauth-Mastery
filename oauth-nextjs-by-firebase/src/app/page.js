"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {user ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Welcome, {user.displayName || user.email}!
          </h1>
          {user.photoURL && (
            <div className="flex justify-center mb-4">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
            </div>
          )}
          <div className="text-gray-300 space-y-2 mb-6">
            <p>Email: {user.email}</p>
            <p>Provider: {user.providerData[0]?.providerId}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Welcome to OAuth Demo
          </h1>
          <Link
            href="/auth"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      )}
    </main>
  );
}
