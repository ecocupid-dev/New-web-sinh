"use client";

import { uploadAPI } from "@/api";
import { Editor } from "@tinymce/tinymce-react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import styles from "./index.module.scss";
import clsx from "clsx";

import "./editor.css"

const init = {
  menubar: true,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "code",
    "help",
    "wordcount",
  ],
  a11y_advanced_options: true,
  toolbar:
    "undo redo | blocks | image " +
    "bold italic forecolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help",
  // content_style: "./editor.css",
  file_picker_types: "image",
  // images_upload_url: `${appConfigs.baseURL}/api/BaseFile/upload-file`,
  paste_data_images: false,
  file_picker_callback: (cb: any, value: any, meta: any) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.addEventListener("change", (e: any) => {
      const file = e.target.files[0];

      const reader = new FileReader();
      const sendFile = {
        originFileObj: file
      }
      reader.addEventListener("load", async () => {
        const urlImg = await uploadAPI.image(sendFile as any, "upload-editor");
        cb(urlImg.Data, { title: file.name, width: 300 });
      });
      reader.readAsDataURL(file);
    });

    input.click();
  },
};

type TEditorFormProps<TFieldValues extends FieldValues> = {
  required?: boolean;
  name: Path<TFieldValues>;
  rules?: RegisterOptions;
  control: Control<TFieldValues, object>;
  disabled?: boolean;
  height?: number | string;
  isUsePlugins?: boolean;
};

export const EditorForm = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  required = true,
  rules,
  disabled,
  height = 500,
  isUsePlugins = true,
}: TEditorFormProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={clsx(styles["editor-wrapper"], "h-fit")}>
          <Editor
            id={name}
            apiKey={"3wpuj0coeuqbm9iz4bmrzbal2p2re5100zbcmmqj6rvf8lni"}
            init={{
              ...init,
              height: height,
              plugins: isUsePlugins ? init.plugins : [],
            }}
            onEditorChange={onChange}
            value={value}
            disabled={disabled}
          />
          <div className={styles["error-msg"]}>{error?.message}</div>
        </div>
      )}
    />
  );
};
