"use client";

import { projectAPI } from "@/api";
import { IconButton } from "@/components";
import { RootState } from "@/store";
import { Modal, Space } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ProjectModal } from "./ProjectModal";

type TProps = {
  record: TProject;
};

export const ActionComponents = ({ record }: TProps) => {
  const { RoleID } = useSelector((state: RootState) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { control, reset, handleSubmit, watch } = useForm<TProject>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (record._id) {
      reset(record);
    }
  }, [record, reset]);

  const mutationDelete = useMutation({
    mutationKey: ["delete-project"],
    mutationFn: async (id: string) => await projectAPI.deleteByID(id),
    onSuccess: (res) => {
      // toast.success(res.Message);
      // handleAfterCallAPI();
      queryClient.invalidateQueries("project-list");
    },
    onError: (error: any) => {
      toast.error(error.Message);
    },
  });

  const mutationUpdate = useMutation({
    mutationKey: ["update-project"],
    mutationFn: async (data: TProject) => await projectAPI.update(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries("project-list");
      setIsOpen(!isOpen)
      toast.success(res.Message)
    },
    onError: (error: any) => {
      toast.error(error.Message)
    }
  })

  const handleDeleteProject = () => {
    const { _id } = watch();

    Modal.confirm({
      title: "Delete Project?",
      content: "Do you want to delete this Project?",
      onOk: async () => {
        if (_id) {
          await mutationDelete.mutateAsync(_id);
        }
      },
      onCancel: () => {},
      cancelButtonProps: {
        style: { background: "red", color: "white", border: "none" },
      },
    });
  };

  const handleUpdateProject = async (data: TProject) => {
    await mutationUpdate.mutateAsync(data)
  };

  return (
    <>
      <Space>
        <IconButton type="edit" onClick={() => setIsOpen(!isOpen)} />
        {RoleID !== 3 && (
          <IconButton type="trash" onClick={handleDeleteProject} />
        )}
      </Space>

      <ProjectModal
        control={control}
        isOpen={isOpen}
        onCancel={() => setIsOpen(!isOpen)}
        title="Update Project"
        isLoading={mutationUpdate.isLoading}
        onOk={handleSubmit(handleUpdateProject)}
      />
    </>
  );
};
