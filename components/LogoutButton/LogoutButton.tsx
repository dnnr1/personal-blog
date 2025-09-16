"use client";

import Button from "../Button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return <Button text="Logout" onClick={() => signOut()} />;
}
