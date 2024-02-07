import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex justify-center h-screen lg:justify-between">
      <div className="hidden bg-zinc-900 text-white h-full p-10 w-screen justify-center lg:flex lg:flex-col lg:justify-between lg:w-2/4">
        <div className="flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span>Trainix Reborn</span>
        </div>

        <>
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;You put water into a bottle, it becomes the bottle. You put it in a teapot, it becomes the teapot.
              Water can flow, or it can crash. Be water, my friend.&rdquo;
            </p>
            <footer className="text-sm">Bruce Lee</footer>
          </blockquote>
        </>
      </div>

      <div className="flex justify-center lg:w-2/4">
        <div className="flex flex-col justify-center w-80 space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login with your account</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials below to login into your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
