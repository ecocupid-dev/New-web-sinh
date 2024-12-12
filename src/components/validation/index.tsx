"use client"

import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


export const Validation = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const token = Cookies.get('token')
  const Id = useSelector((state: RootState) => state.user._id);

  if (!token || !Id) {
    router.push("/login")
    return
  }
  return <div>{children}</div>;
};
