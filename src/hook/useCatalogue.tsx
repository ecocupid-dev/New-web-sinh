/**
 * Country - local
 * Position - local
 * Project {}
 * Users {}
 */

import { catalogueAPI, userAPI } from "@/api";
import { useQuery } from "react-query";

const staleTime = 5 * 6 * 10000


type TProps = {
  projectEnabled?: boolean;
  userEnabled?: boolean;
  categoryEnabled?: boolean;
  writerEnabled?: boolean
}

export const useCatalogue = ({
  projectEnabled = false,
  userEnabled = false,
  categoryEnabled = false,
  writerEnabled = false
}: TProps) => {

  const userList = useQuery({
    queryKey: ["user-catalogue"],
    queryFn: async () => catalogueAPI.getAllUser({IsPublish: true}),
    onSuccess: (res) => res.Data,
    staleTime: staleTime,
    enabled: userEnabled,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const writerList = useQuery({
    queryKey: ["writer-catalogue"],
    queryFn: async () => catalogueAPI.getAllWriter({}),
    onSuccess: (res) => res.Data,
    staleTime: staleTime,
    enabled: writerEnabled,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const caterogyList = useQuery({
    queryKey: ["caterogy-catalogue"],
    queryFn: async () => catalogueAPI.getAllCaterogy({}),
    onSuccess: (res) => res.Data,
    staleTime: staleTime,
    enabled: categoryEnabled,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const projectList = useQuery({
    queryKey: ["project-catalogue"],
    queryFn: async () => catalogueAPI.getAllProject({}),
    onSuccess: (res) => res.Data,
    staleTime: staleTime,
    enabled: projectEnabled,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });


  return ({
    userList: userList.data,
    caterogyList: caterogyList.data,
    projectList: projectList.data,
    writerList: writerList.data
  })
}

