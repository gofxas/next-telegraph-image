import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Uploader } from "@/components/home/uploader.jsx";
import { List } from "@/components/home/list.jsx";

const fetchData = async () => {
  const res = await fetch(
    `https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=3`
  );
  const bing_data = await res.json();
  return bing_data.images;
};
export default async function Home() {
  const bgs = await fetchData();
  // const bgs = []
  return (
    <div className="home flex flex-col items-center justify-center">
      <div className="background">
        {bgs.map((bg, index) => {
          return (
            <figure
              key={bg.url}
              style={{
                backgroundImage: `url(https://cn.bing.com/${bg.url})`,
                animationDelay: 6 * index + "s",
              }}
            />
          );
        })}
        <figure></figure>
      </div>
      <Card className="base-card w-full flex flex-col md:w-[750px] lg:w-[950px] xl:w-[1200px] 2xl:w-[1450px]">
        <CardHeader>
          <CardTitle style={{ textShadow: "1px 1px 1px #fff" }}>
            选择一个图片上传
          </CardTitle>
          <CardDescription
            style={{ textShadow: "1px 1px 1px #fff", color: "#999" }}
          >
            选择一个图片文件进行上传。由于Telegraph限制，单个图片仅限5mb。
          </CardDescription>
          <CardDescription
            style={{ textShadow: "1px 1px 1px #fff", color: "#999" }}
          >
            使用Nextjs搭建的图床工具，可以直接部署到Vercel使用。项目地址：<a href="https://github.com/gofxas/next-telegraph-image" target={"_blank"}>https://github.com/gofxas/next-telegraph-image</a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Uploader />
          <List />
        </CardContent>
        <CardFooter>
        <a 
          target={"_blank"}
          className="font-bold text-red-400 hover:text-red-600"
          href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgofxas%2Fnext-telegraph-image&amp;project-name=next-telegraph-image&amp;repository-name=next-telegraph-image" rel="nofollow">
            一键部署到Vercel
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
