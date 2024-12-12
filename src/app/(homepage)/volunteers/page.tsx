import { JoinToday, MainVolunteer, MyBreadCumb } from "@/components";
import React from "react";

function VolunteerPage() {
  return (
    <>
      <MyBreadCumb
        firstRoute={{ name: "Home", path: "/" }}
        curRoute={{ name: "Volunteer" }}
      />
      <MainVolunteer />
      <JoinToday />
    </>
  );
}

export default VolunteerPage;
