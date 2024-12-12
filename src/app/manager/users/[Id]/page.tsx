"use client";

import { DetailContent, DetailHeader } from "@/components";
import { RootState } from "@/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const UserDetail = () => {
  const { Id } = useParams();

  const user = useSelector((state: RootState) => state.user);

  const { control, reset, watch } = useForm<TCreateUser>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (Id === user._id) {
      reset(user);
    }
  }, [Id, reset, user]);

  return (
    <div>
      <DetailHeader
        defaultAvatar={watch("Avatar") || ""}
        userId={Id as string}
      />
      <DetailContent data={user}/>
    </div>
  );
};

export default UserDetail;
