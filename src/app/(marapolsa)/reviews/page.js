import ReviewComponent from "@/components/custom-components/reviews-component/MainComponent";

export const metadata = {
  title: "Reviews",
  description: `Discover honest and insightful reviews of the latest movies at Marapolsa. We help you make informed decisions on what to watch, offering a platform for filmmakers to showcase their work, no matter the genre or budget`,
};

const ReviewPage = () => {
  return (
    <>
      <ReviewComponent />
    </>
  );
};

export default ReviewPage;
