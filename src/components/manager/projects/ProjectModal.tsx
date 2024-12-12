"use client";

import {
  InputForm,
  ModalForm,
  SelectForm,
  SwitchForm,
  TextAreaForm,
  UploadForm,
} from "@/components";
import { countryList } from "@/config";
import React from "react";
import { Control } from "react-hook-form";

type TProps = {
  isOpen: boolean;
  onOk: () => void;
  isLoading: boolean;
  control: Control<TProject, object>;
  title: string;
  onCancel: () => void;
};

export const ProjectModal = ({
  isLoading,
  isOpen,
  control,
  title,
  onOk,
  onCancel,
}: TProps) => {
  return (
    <ModalForm
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      title={title}
      loading={isLoading}
      size={{
        minWidth: "50vw",
      }}
    >
      <div className="grid grid-cols-6 gap-2">
        <UploadForm
          control={control}
          name="Image"
          label="Thumbnail"
          target="project"
          disabled={isLoading}
        />
        <div className="col-span-5 pl-5">
          <InputForm
            control={control}
            name="Title"
            label="Title"
            placeholder="Enter project title"
            required
            disabled={isLoading}
            inputWapperStyles="mb-4"
          />
          <div className="col-span-1 flex justify-between">
            <SelectForm
              control={control}
              name="CountryId"
              dataOptions={countryList.map((item) => ({
                label: item.Name,
                value: item.Id,
              }))}
              placeholder="Select country"
              label="Project country ID"
              disabled={isLoading}
              allowClear={true}
              showSearch
              wrapperStyles="w-1/2"
            />
            <SwitchForm
              control={control}
              name="IsPublish"
              label="Is Publish?"
              trueChecked="Yes"
              falseChecked="No"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="col-span-full">
          <TextAreaForm
            disabled={isLoading}
            control={control}
            name="Description"
            placeholder="Write some description"
            label="Desciption"
            rows={3}
          />
        </div>
      </div>
    </ModalForm>
  );
};
