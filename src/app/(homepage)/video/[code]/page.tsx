import { videoAPI } from "@/api";
import { NotFound } from "@/components";
import { VideoScreenIndex } from "@/components/videoScreen";
import { Metadata, ResolvingMetadata } from "next";

type TProps = {
  params: { code: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getVideoDetail(code: string, isForSEO: boolean) {
  try {
    const res = await videoAPI.getByCode({ code, isForSEO });
    return res.Data;
  } catch (error) {
    console.log("Error in DetailArticle", error);
  }
}

export async function generateMetadata(
  { params }: TProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  try {
    const blogData = await videoAPI.getByCode({
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

async function DynamicVideoPageIndex({ params }: TProps) {
  if (!params.code) return;

  const data = await getVideoDetail(params.code, false);

  if (!data?._id) return <NotFound text="Article Not Found !" />;


  return <VideoScreenIndex data={data}/>
}

export default DynamicVideoPageIndex;
