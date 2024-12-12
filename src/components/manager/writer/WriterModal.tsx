"use client";

import {
  InputForm,
  ModalForm,
  SwitchForm,
  TextAreaForm,
  UploadForm,
} from "@/components/global";
import { Control } from "react-hook-form";

type TProps = {
  isOpen: boolean;
  onOk: () => void;
  isLoading: boolean;
  control: Control<TWriter, object>;
  title: string;
  onCancel: () => void;
  isUpdate?: boolean;
};

export const WriterModal = ({
  isOpen,
  isLoading,
  onOk,
  control,
  title,
  onCancel,
  isUpdate = false,
}: TProps) => {
  return (
    <ModalForm
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      title={title}
      loading={isLoading}
      size={{
        minWidth: "60vw",
      }}
    >
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-3">
          <InputForm
            control={control}
            name="UserName"
            label="UserName"
            placeholder="Enter UserName"
            required
            disabled={isLoading}
          />
          <InputForm
            control={control}
            name="Email"
            label="Email"
            placeholder="Enter email"
            disabled={isLoading}
          />
          <InputForm
            control={control}
            name="LinkedIn"
            label="LinkedIn"
            disabled={isLoading}
            placeholder="Enter linkedIn"
          />
          <SwitchForm
            control={control}
            name="IsPublish"
            label="Is active?"
            trueChecked="Yes"
            falseChecked="No"
            disabled={isLoading}
          />
        </div>
        <div className="col-span-3">
          <UploadForm
            control={control}
            name="Avatar"
            label="Avatar"
            target="user"
            disabled={isLoading}
          />
          <TextAreaForm
            disabled={isLoading}
            control={control}
            name="Description"
            placeholder="Write some description"
            label="Desciption"
            rows={5}
          />
        </div>
      </div>
    </ModalForm>
  );
};
