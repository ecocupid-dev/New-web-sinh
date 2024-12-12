"use client";

import { InputForm, TextAreaForm, UploadForm } from "@/components/global";
import { Control } from "react-hook-form";

type TProps = {
  control: Control<TVideo, any>;
  isLoading: boolean;
};

export const VideoSEO = ({ control, isLoading }: TProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <InputForm
        control={control}
        name="OgUrl"
        placeholder="ogUrl auto rendering when blog created"
        label="ogUrl (Auto rendering by Title)"
        disabled
        inputWapperStyles="col-span-2"
      />
      <InputForm
        control={control}
        name="MetaKeywords"
        placeholder="Enter metaKeywords"
        label="metaKeywords"
        inputWapperStyles="col-span-2"
        disabled={isLoading}
      />

      <InputForm
        control={control}
        name="MetaTitle"
        placeholder="Enter metaTitle"
        label="metaTitle"
        inputWapperStyles="col-span-1"
        disabled={isLoading}
      />
      <InputForm
        control={control}
        name="OgxTitle"
        placeholder="Enter ogxTitle"
        inputWapperStyles="col-span-1"
        disabled={isLoading}
        label="ogxTitle"
      />
      <InputForm
        control={control}
        name="OgTitle"
        placeholder="Enter ogTitle"
        inputWapperStyles="col-span-1"
        disabled={isLoading}
        label="ogTitle"
      />
      <InputForm
        control={control}
        name="OgFacebookTitle"
        placeholder="Enter ogFacebookTitle"
        inputWapperStyles="col-span-1"
        disabled={isLoading}
        label="ogFacebookTitle"
      />

      <TextAreaForm
        control={control}
        name="MetaDescription"
        placeholder="Enter metaDescription"
        label="metaDescription"
        inputWapperStyles="col-span-1"
        disabled={isLoading}
      />
      <TextAreaForm
        control={control}
        name="OgxDescription"
        placeholder="Enter ogxDescription"
        inputWapperStyles="col-span-1"
        disabled={isLoading}
        label="ogxDescription"
      />
      <TextAreaForm
        control={control}
        name="OgDescription"
        placeholder="Enter ogDescription"
        inputWapperStyles="col-span-1"
        disabled={isLoading}
        label="ogDescription"
      />
      <TextAreaForm
        control={control}
        name="OgFacebookDescription"
        placeholder="Enter ogFacebookDescription"
        inputWapperStyles="col-span-1"
        disabled={isLoading}
        label="ogFacebookDescription"
      />

      <UploadForm
        control={control}
        target="videos"
        name="OgxImage"
        label="ogxImage"
        disabled={isLoading}
      />
      <UploadForm
        control={control}
        target="videos"
        name="OgFacebookImage"
        label="ogFacebookImage"
        disabled={isLoading}
      />
    </div>
  );
};
