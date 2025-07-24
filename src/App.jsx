import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function App() {
  return (
    <div style={{ textAlign: "center", paddingTop: "40px" }}>
      <SignedIn>
        <h2>You're signed in!</h2>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <h2>Please sign in below</h2>
        <SignInButton />
      </SignedOut>
    </div>
  );
}
