import { articleAPI, homeAPI } from "@/api";
import { CategoryScreenIndex, DetailArticle } from "@/components";
import { routesWithoutDynamic } from "@/config";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { code: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getHomeCategoryList() {
  try {
    const res = await homeAPI.getCategoryList({ IsPublish: true });
    return res.Data;
  } catch (error) {}
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  if (params.code === "error")
    return {
      title: "Loading ...",
    };
    
  if (params.code === "eco-stories") {
    return {
      title: "Eco-Stories",
      description: "All of Ecocupid stories",
    };
  }

  if (routesWithoutDynamic.find((item) => item.match(params.code)))
    return {
      title: "Eco-Stories",
      description: "All of Ecocupid stories",
    };

  const resCats = await getHomeCategoryList();

  const isCategoryPage = resCats?.find((item) => item.Code === params.code);

  if (isCategoryPage) {
    return {
      title: isCategoryPage?.Name,
      description:
        isCategoryPage?.Description || "Ecocupid category description",
    };
  }

  try {
    const blogData = await articleAPI.getByCode({
      code: params.code,
      isForSEO: true,
    });

    const data = blogData?.Data;

    return {
      title: data?.Title,
      description: data?.Summary || data?.OgDescription,
      keywords: data?.MetaKeywords,
      openGraph: {
        title: {
          template: `%s - ${data?.OgTitle}`,
          default: data?.OgTitle || data?.Title || "",
        },
        url: data?.OgUrl,
        images: data?.Thumnail,
        locale: "en_US",
        type: "website",
      },
      twitter: {
        images: data?.OgFacebookImage,
        title: data?.OgFacebookTitle,
        description: data?.OgFacebookDescription,
      },
      other: {
        ogFacebookImage: data?.OgFacebookImage || data?.Thumnail || "",
        ogFacebookTitle:
          data?.OgFacebookTitle || data?.Title || data?.OgTitle || "",
        ogFacebookDescription:
          data?.OgFacebookDescription || data?.MetaDescription || "",
        ogxTitle: data?.OgxTitle || data?.MetaTitle || data?.Title || "",
        ogxDescription: data?.OgxDescription || "",
        ogxImage: data?.OgxImage || data?.MetaDescription || "",
      },
    };
  } catch (error) {
    console.error("API call failed:", error);

    return {
      title: "Not Found",
      description: "An error occurred while fetching the article.",
    };
  }
}

async function DynamicPageIndex({ params }: Props) {
  if (
    params.code === "error" ||
    routesWithoutDynamic.find((route) => route.match(params.code)) !== undefined
  )
    return <></>;

  const resCats = await getHomeCategoryList();

  const categoryTarget = resCats?.find((item) => item.Code === params.code);

  return (
    <div>
      {categoryTarget && <CategoryScreenIndex category={categoryTarget} />}
      {!categoryTarget && params.code === "eco-stories" && (
        <CategoryScreenIndex
          category={{
            _id: "66891574fb647096054682c3",
            Name: "Eco-Stories",
            Code: "eco-stories",
          }}
        />
      )}
      {!categoryTarget && params.code !== "eco-stories" && (
        <DetailArticle code={params.code} />
      )}
    </div>
  );
}

export default DynamicPageIndex;
