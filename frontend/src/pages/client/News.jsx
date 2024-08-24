import { useQuery } from "@tanstack/react-query";
import NewsBanner from "../../components/client/news/NewsBanner";
import NewsAbove from "../../components/client/news/NewsAbove";
import NewsBelow from "../../components/client/news/NewsBelow";
import useScrollToTop from "@/hooks/useScrollToTop";
import { getAllNews } from "@/services/newsApi";
import NotFound from "@/components/client/notFound";
export default function News() {
  useScrollToTop();

  const { data, error, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: getAllNews,
  });

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="bg-[#E8F2F7]">
      <NewsBanner />
      <NewsAbove news={data} isLoading={isLoading} />
      <NewsBelow news={data} isLoading={isLoading} />
    </div>
  );
}
