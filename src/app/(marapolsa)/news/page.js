import React from "react";
import NewsComponent from "@/components/custom-components/news-component/NewsComponent";

export const metadata = {
  title: "News",
  description: `Discover honest and insightful reviews of the latest movies at Marapolsa. We help you make informed choices on what to watch, offering a platform for filmmakers to share their work with the world, regardless of genre, budget, or production value.`,
};

const NewsPage = () => {
  return <NewsComponent />;
};

export default NewsPage;
