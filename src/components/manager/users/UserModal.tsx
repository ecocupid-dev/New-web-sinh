"use client";

import {
  InputForm,
  ModalForm,
  SelectForm,
  TextAreaForm,
  UploadForm,
} from "@/components";
import { roleData } from "@/config";
import React from "react";
import { Control } from "react-hook-form";

type TProps = {
  isOpen: boolean;
  onOk: () => void;
  isLoading: boolean;
  control: Control<TCreateUser, object>;
  title: string;
  onCancel: () => void;
  isUpdate?: boolean;
};

export const UserModal = ({
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
            placeholder="Enter username"
            required
            disabled={isUpdate}
          />
          {isUpdate ? (
            <>
              <InputForm
                control={control}
                name="NewPassword"
                label="New password"
                placeholder="Enter new password"
                disabled={isLoading}
              />
              <InputForm
                control={control}
                name="NewPasswordConfirm"
                label="New password confirm"
                placeholder="Enter confirm new password"
                disabled={isLoading}
              />
            </>
          ) : (
            <>
              <InputForm
                control={control}
                name="Password"
                label="Password"
                placeholder="Enter password"
                required
                disabled={isLoading}
              />
              <InputForm
                control={control}
                name="ConfirmPassword"
                label="ConfirmPassword"
                placeholder="Enter confirm password"
                required
                disabled={isLoading}
              />
            </>
          )}
        </div>
        <div className="col-span-3">
          <SelectForm
            control={control}
            name="RoleID"
            dataOptions={roleData.map((item) => ({
              label: item.RoleName,
              value: item.RoleID,
            }))}
            label="Position"
            placeholder="Select position"
            required
            disabled={isLoading}
          />
          <InputForm
            control={control}
            name="Email"
            label="Email"
            placeholder="Enter email"
            required
            disabled={isLoading}
          />
          <InputForm
            control={control}
            name="LinkedIn"
            label="LinkedIn"
            disabled={isLoading}
            placeholder="Enter linkedIn"
          />
        </div>
        <div className="col-span-1">
          <UploadForm
            control={control}
            name="Avatar"
            label="Avatar"
            target="user"
            disabled={isLoading}
          />
        </div>
        <div className="col-span-5">
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
