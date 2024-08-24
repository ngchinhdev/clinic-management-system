import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ContentNews from "../../components/client/newsDetail/Content";
import { getNewsById, getAllNews } from "@/services/newsApi";
import useScrollToTop from "@/hooks/useScrollToTop";
import NotFound from "@/components/client/notFound";

export default function NewsDetail() {
  useScrollToTop();
  const { id } = useParams();

  const {
    data: allNews,
    error: errorNews,
    isLoading: isLoadingNews,
  } = useQuery({
    queryKey: "news",
    queryFn: getAllNews,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: () => getNewsById(id),
  });

  if (error || errorNews) return <NotFound />;

  return (
    <div className="bg-[#E8F2F7] py-5">
      <ContentNews
        news={data}
        allNews={allNews}
        isLoading={isLoading}
        isLoadingAllNews={isLoadingNews}
      />
    </div>
  );
}
