import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Container } from "react-bootstrap";
import { FaArrowLeftLong } from "react-icons/fa6";
import SingleReviewComponent from "./SingleReview";
import SearchAndMoreSkeleton from "./SearchAndMoreSkeleton";

import classes from "./MainComponent.module.css";

const SeeMoreComponent = (props) => {
  const router = useRouter();
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMoreReviews = async () => {
    setLoadingMore(true);
    await props.fetchMore(); // Load next 10 reviews
    setLoadingMore(false);
  };
  return (
    <Container>
      <Button
        onClick={() => router.back()}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "transparent",
          borderColor: "transparent",
          color: "#000",
        }}
      >
        <FaArrowLeftLong size={25} style={{ marginRight: 10 }} /> Back
      </Button>
      <h2 style={{ marginTop: 30, fontWeight: "bold", fontSize: 30 }}>
        {props.title}
      </h2>
      <hr style={{ border: "1.4px solid #000" }} />
      {props.error && (
        <div className="text-center py-5">
          Error loading reviews: {props.error.message}
        </div>
      )}
      {props.isLoading ? (
        <div className="text-center py-5">
          <SearchAndMoreSkeleton />
        </div>
      ) : (
        <section style={{ marginTop: 30 }}>
          {props.data.length > 0 ? (
            <>
              {props.data.map((item) => (
                <main key={Math.random()} style={{ marginBottom: 20 }}>
                  <SingleReviewComponent {...item} />
                </main>
              ))}
            </>
          ) : (
            <div className="text-center py-5" style={{ fontWeight: "bold" }}>
              No review with the searched word
            </div>
          )}
        </section>
      )}
      {!props.isLoading && props.hasMore && (
        <div className="text-center" style={{ marginBottom: 40 }}>
          <Button
            className={classes.seeMoreBtn}
            onClick={loadMoreReviews}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading more..." : "See more"}
          </Button>
        </div>
      )}
      {!props.hasMore && (
        <div className="text-center py-4" style={{ marginBottom: 50 }}>
          No more reviews to load
        </div>
      )}
    </Container>
  );
};

export default SeeMoreComponent;
