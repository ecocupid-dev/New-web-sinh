"use client";
import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { Button, Image } from "antd";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputForm } from "@/components";
import { toast } from "react-toastify";

const FooterLeft = () => {
  return (
    <div className={styles["eco-footer-left"]}>
      <div className={styles["eco-footer-logo"]}>
        <Image
          src="/logo.png"
          alt="eco-logo-footer"
          width={"100%"}
          height={"100%"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      </div>
      <Link className={styles["eco-footer-item"]} href={"/about-us"}>
        About us
      </Link>
      <Link className={styles["eco-footer-item"]} href={"/partner"}>
        Partner with us
      </Link>
      <Link className={styles["eco-footer-item"]} href={"/volunteers"}>
        Volunteer
      </Link>
      <Link className={styles["eco-footer-item"]} href={"/our-readers-stories"}>
        Our Readers’ Stories
      </Link>
    </div>
  );
};

const FooterCenter = () => {
  return (
    <div className={styles["eco-footer-center"]}>
      <div className={styles["eco-footer-center-top"]}>
        <h3 className={styles["eco-footer-title"]}>Terms of use</h3>
        {/* <Link className={styles["eco-footer-item"]} href={"/about-us"}>
          About us
        </Link> */}
        <Link className={styles["eco-footer-item"]} href={"/"}>
          Terms & Conditions
        </Link>
        <Link className={styles["eco-footer-item"]} href={"/"}>
          Privacy Policy
        </Link>
        <Link className={styles["eco-footer-item"]} href={"/"}>
          Cookies Policy
        </Link>
      </div>
      <div className={styles["eco-footer-center-bottom"]}>
        <h3 className={clsx(styles["eco-footer-title"])}>Supported by</h3>
        <div className={styles["eco-footer-images"]}>
          <div className={styles["eco-footer-image"]}>
            <Image
              src="/image/footer-01.png"
              alt="eco-logo-footer-image"
              style={{ borderRadius: "4px" }}
            />
          </div>
          <div className={styles["eco-footer-image"]}>
            <Image
              src="/image/footer-02.png"
              alt="eco-logo-footer-image"
              style={{ borderRadius: "4px" }}
            />
          </div>
          <div className={styles["eco-footer-image"]}>
            <Image
              src="/image/footer-03.png"
              alt="eco-logo-footer-image"
              style={{ borderRadius: "4px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FooterRight = () => {
  type TForm = {
    Email: string;
  };
  const schema = yup
    .object({
      Email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    })
    .required();

  const { control, handleSubmit, resetField } = useForm<TForm>({
    mode: "onBlur",
    defaultValues: {
      Email: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubscribe = (data: TForm) => {
    toast.success("Thank you for your subscribe!");
  };

  const SubscribeButton = () => {
    return (
      <Button
        className={styles["eco-footer-button"]}
        onClick={handleSubmit(handleSubscribe)}
      >
        Subscribe
      </Button>
    );
  };

  return (
    <div className={styles["eco-footer-right"]}>
      <form className={styles["eco-footer-form-wrap"]} onSubmit={handleSubmit(handleSubscribe)}>
        <h3 className={styles["eco-footer-title"]}>
          Email subscription to get informed via email about new articles
        </h3>
        <p className={styles["eco-footer-item"]}>
          By clicking Subscribe, you have agreed to our Terms & Conditions and
          Privacy Policy.
        </p>
        <div className={styles["eco-footer-form"]}>
          <InputForm
            control={control}
            name="Email"
            placeholder="Enter your email address"
            suffix={SubscribeButton()}
          />
        </div>
        <h6 className={styles["eco-footer-item"]}>
          © EcoCupid. All Rights Reserved.
        </h6>
      </form>
      <div className={styles["eco-footer-images"]}>
        <div className={styles["eco-footer-image"]}>
          <Image
            src="/image/footer-01.png"
            alt="eco-logo-footer-image"
            style={{ borderRadius: "8px" }}
          />
        </div>
        <div className={styles["eco-footer-image"]}>
          <Image
            src="/image/footer-02.png"
            alt="eco-logo-footer-image"
            style={{ borderRadius: "8px" }}
          />
        </div>
        <div className={styles["eco-footer-image"]}>
          <Image
            src="/image/footer-03.png"
            alt="eco-logo-footer-image"
            style={{ borderRadius: "8px" }}
          />
        </div>
      </div>
    </div>
  );
};

export const HomeFooter = () => {
  return (
    <div className={styles["eco-footer"]}>
      <div className={clsx(styles["eco-footer-inner"], "container")}>
        <FooterLeft />
        {/* <FooterCenter /> */}
        <FooterRight />
      </div>
    </div>
  );
};
