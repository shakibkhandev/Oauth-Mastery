import { auth, signOut } from "@/app/auth";

export default async function Home() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={session?.user?.image}
            alt={session?.user?.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-100">
              Welcome, {session?.user?.name}
            </h1>
            <p className="text-gray-300">{session?.user?.email}</p>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-md mb-6">
          <h2 className="text-sm font-semibold text-gray-300 mb-2">
            Session Details
          </h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-300">
              <span className="font-medium">Expires:</span>{" "}
              {new Date(session?.expires).toLocaleString()}
            </p>
          </div>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/auth" });
          }}
        >
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Sign Out
          </button>
        </form>
      </div>
    </main>
  );
}
