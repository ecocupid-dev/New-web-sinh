import {
  Community,
  ForYou,
  Guiding,
  MainConcept,
  MyBreadCumb,
  OurTeam,
  PastAndFuture,
  SectionTop,
  WhyHaveName,
} from "@/components";

function AboutUsPage() {
  return (
    <>
      <MyBreadCumb
        firstRoute={{ name: "Home", path: "/" }}
        curRoute={{ name: "About" }}
      />
      <SectionTop />
      <MainConcept />
      <PastAndFuture />
      <Guiding />
      <WhyHaveName />
      <OurTeam />
      <ForYou />
      <Community />
    </>
  );
}

export default AboutUsPage;
