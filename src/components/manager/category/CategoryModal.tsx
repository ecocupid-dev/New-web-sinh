import {
  ColorForm,
  InputForm,
  ModalForm,
  SwitchForm,
  TextAreaForm,
} from "@/components";
import React from "react";
import { Control } from "react-hook-form";

type TProps = {
  isOpen: boolean;
  onOk: () => void;
  isLoading: boolean;
  control: Control<TCreateCategory, object>;
  title: string;
  onCancel: () => void;
  type: "update" | "create"
};

export const CategoryModal = ({
  isLoading,
  isOpen,
  control,
  title,
  onOk,
  onCancel,
  type
}: TProps) => {
  return (
    <ModalForm
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      title={title}
      loading={isLoading}
    >
      <>
        <div className="flex gap-4">
          <div className="flex-1">
            <InputForm
              control={control}
              name="Name"
              label="Name Category"
              placeholder="Enter name category"
              required={true}
              rules={{
                required: "Please enter name category",
              }}
              disabled={type === "update" || isLoading}
            />
          </div>
          <ColorForm
            control={control}
            name="Color"
            label="Color"
            disabled={isLoading}
          />
        </div>
        <TextAreaForm
          disabled={isLoading}
          control={control}
          name="Description"
          label="Desciption"
        />
        <div className="flex">
          <SwitchForm
            control={control}
            name="IsFeature"
            label="Is Feature?"
            trueChecked="Yes"
            falseChecked="No"
            disabled={isLoading}
            switchFormClass="flex-1"
          />
          <SwitchForm
            control={control}
            name="IsPublish"
            label="Is Publish?"
            trueChecked="Yes"
            falseChecked="No"
            disabled={isLoading}
            switchFormClass="flex-1"
          />
        </div>
      </>
    </ModalForm>
  );
};
