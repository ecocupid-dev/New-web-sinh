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
import { countryList } from "@/config";
import { useCatalogue } from "@/hook";
import { Control } from "react-hook-form";

type TProps = {
  control: Control<TArticles, any>;
  isLoading: boolean;
};

export const ArticleGeneral = ({ control, isLoading }: TProps) => {
  const { caterogyList, projectList, writerList } = useCatalogue({
    categoryEnabled: true,
    projectEnabled: true,
    writerEnabled: true,
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
          <div>
            <InputForm
              control={control}
              name="OldId"
              placeholder="Enter old id of article"
              disabled={isLoading}
            />
          </div>
        </div>

        <SelectForm
          control={control}
          name="CountryId"
          dataOptions={countryList.map((item) => ({
            label: item.Name,
            value: item.Id,
          }))}
          placeholder="Select country"
          label="Country"
          disabled={isLoading}
          allowClear={true}
          showSearch
          required
        />
        <SelectForm
          control={control}
          name="WriterId"
          dataOptions={writerList?.Data.map((item: TWriter) => ({
            label: item.UserName,
            value: item._id,
          }))}
          placeholder="Select writer"
          label="Writer"
          disabled={isLoading}
          allowClear={true}
          showSearch
          required
        />
        <SelectForm
          dataOptions={projectList?.Data?.map((item: TProject) => ({
            label: item.Title,
            value: item._id,
          }))}
          placeholder="Select project"
          control={control}
          name="ProjectId"
          label="Project"
          showSearch
          disabled={isLoading}
          allowClear={true}
          required
        />
        <SelectForm
          control={control}
          name="CategoryId"
          dataOptions={caterogyList?.Data?.map((item: TCategory) => ({
            label: item.Name,
            value: item._id,
          }))}
          placeholder="Select category"
          label="Category"
          disabled={isLoading}
          allowClear={true}
          required
          showSearch
        />
        <InputForm
          control={control}
          name="Title"
          label="Title"
          placeholder="Enter video title"
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
