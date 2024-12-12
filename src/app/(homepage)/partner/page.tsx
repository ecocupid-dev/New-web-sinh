import { MyBreadCumb, Partner } from "@/components";

function PartnerPage() {
  return (
    <>
      <MyBreadCumb
        firstRoute={{ name: "Home", path: "/" }}
        curRoute={{ name: "Partner with us" }}
      />
      <Partner />;
    </>
  );
}

export default PartnerPage;
