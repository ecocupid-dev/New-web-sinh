"use client";

import { Suspense } from "react";
import { MyBreadCumb } from "@/components";
import { SearchPage } from "@/components/homepage/search";

function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyBreadCumb
        firstRoute={{
          name: "Home",
          path: "/",
        }}
        curRoute={{
          name: "Search",
        }}
      />
      <div className="container">
        <SearchPage />
      </div>
    </Suspense>
  );
}

export default Index;
