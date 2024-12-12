"use client";

import { authenticate, userAPI } from "@/api";
import { setToken } from "@/api/instance";
import { InputForm } from "@/components";
import { updateUser } from "@/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import styles from "../index.module.scss";

const schema = yup
  .object({
    UserName: yup.string().trim().required(),
    Password: yup.string().trim().required(),
  })
  .required();

export const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<TLogin>({
    mode: "onBlur",
    defaultValues: {
      UserName: "",
      Password: "",
    },
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const mutationLogin = useMutation({
    mutationKey: ["mutation-login"],
    mutationFn: async (data: TLogin) => await authenticate.login(data),
    onSuccess: async (res) => {
      const newToken = res.Data?.AccessToken;
      
      if (newToken) {
        await setToken(newToken);
        Cookies.set("token", newToken);
        const tokenParse: TUser = jwtDecode(newToken);

        if (tokenParse._id) {
          const userInfo = await userAPI.getByID(tokenParse._id)
          dispatch(updateUser(userInfo.Data as TUser));
          router.push("/manager/articles")
        }
      }
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const handleLogin = async (data: TLogin) => {
    await mutationLogin.mutateAsync(data);
  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <div className={styles["login"]}>
      <div className={styles["login-bg"]}>
        <Image
          src={"/image/login-bg.png"}
          alt="eco-login-background"
          objectFit="cover"
          fill
        />
      </div>
      <div className={styles["login-form"]}>
        <div className={styles["login-logo"]}>
          <Image src={"/logo.png"} alt="ec-logo-login" fill objectFit="cover" />
        </div>
        <h1 className={styles["login-form-title"]}>Sign in</h1>
        <form
          className={styles["login-form-inner"]}
          onSubmit={handleSubmit(handleLogin)}
        >
          <InputForm
            control={control}
            name="UserName"
            label="UserName"
            placeholder="Enter your Username"
            required
            labelStyles="text-white"
            disabled={mutationLogin.isLoading}
          />
          <InputForm
            control={control}
            name="Password"
            label="Password"
            placeholder="Enter your Password"
            required
            labelStyles="text-white"
            type={showPassword ? "text" : "password"}
            disabled={mutationLogin.isLoading}
            suffix={
              <Image
                src={showPassword ? "/svg/eye.svg" : "/svg/eye-close.svg"}
                alt="eco-eye-open"
                width={20}
                height={20}
                onClick={handleTogglePassword}
              />
            }
          />

          <Button
            className={styles["login-button"]}
            onClick={handleSubmit(handleLogin)}
            loading={mutationLogin.isLoading}
            htmlType="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
