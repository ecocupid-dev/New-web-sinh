import { MyBreadCumb } from "@/components";
import { FilmFeature, FilmImpact, FilmLatest } from "@/components/filmScreen";

function EcoFilmsPage() {
  return (
    <div>
      <MyBreadCumb
        firstRoute={{
          name: "Home",
          path: '/',
        }}
        curRoute={{
          name: "Eco-Films",
        }}
      />
      <div className="container">
        <FilmImpact />
        <FilmLatest />
        <FilmFeature />
      </div>
    </div>
  );
}

export default EcoFilmsPage;
