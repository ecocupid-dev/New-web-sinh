"use client";

import {
  EditorForm,
  InputForm,
  SelectForm,
  SwitchForm,
  TagsForm,
  TextAreaForm,
  UploadForm,
} from "@/components/global";
import { useCatalogue } from "@/hook";
import { Control } from "react-hook-form";

type TProps = {
  control: Control<TVideo, any>;
  isLoading: boolean;
};

export const VideoGeneral = ({ control, isLoading }: TProps) => {
  const { projectList } = useCatalogue({
    projectEnabled: true,
  });

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4 flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <UploadForm
            control={control}
            name="Thumnail"
            label="Thumbnail"
            target="videos"
            disabled={isLoading}
          />
        </div>

        <SelectForm
          control={control}
          name="ProjectId"
          dataOptions={projectList?.Data?.map((item: TProject) => ({
            label: item.Title,
            value: item._id,
          }))}
          placeholder="Select project"
          label="Project"
          disabled={isLoading}
          allowClear={true}
          required
        />
        <InputForm
          control={control}
          name="Title"
          label="Title"
          placeholder="Enter video title"
          required
          disabled={isLoading}
        />
        <InputForm
          control={control}
          name="LinkYoutube"
          label="Link Youtube"
          placeholder="Enter link youtube"
          required
          disabled={isLoading}
        />
        <TextAreaForm
          control={control}
          name="Summary"
          label="Summary"
          required
          disabled={isLoading}
        />
        <TagsForm
          control={control}
          name="Tags"
          label="Tags"
          disabled={isLoading}
          placeholder="Fill the tag (Enter to create)"
        />
      </div>

      <div className="col-span-8">
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
        <EditorForm
          control={control}
          name="Content"
          height={680}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};
