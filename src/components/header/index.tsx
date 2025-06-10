"use client"

import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header(){

  const { status, data } = useSession();

  async function handleSignIn() {
    await signIn();
  }

  async function handleSignOut() {
    await signOut();
  }



  return (
    <header className="w-full flex items-center justify-center px-2 h-20 py-4 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7xl">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
            <span className="text-blue-500 pr-1">
              DEV
            </span> 
  
            CONTROLE
          </h1>
        </Link>

        {status === "loading" && (
          <button className="cursor-pointer animate-spin" >
            <FiLoader size={26} color="#4b5563"/>
          </button>
        )}

        {status === "unauthenticated" && (
          <button className="cursor-pointer" onClick={handleSignIn}>
            <FiLock size={26} color="#4b5563"/>
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-center gap-1">
            <Link href="/dashboard">
              <FiUser size={26} color="#4b5563" />
            </Link>
            <button onClick={handleSignOut}>
              <Link href="/login">
                <FiLogOut size={26} color="#4b5563" />
              </Link>
            </button>
          </div>
        )}


      </div>
    </header>
  )
}