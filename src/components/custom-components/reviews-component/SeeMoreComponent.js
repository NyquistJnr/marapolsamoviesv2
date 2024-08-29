import React from "react";
import { useRouter } from "next/navigation";
import { Button, Container } from "react-bootstrap";
import { FaArrowLeftLong } from "react-icons/fa6";
import SingleReviewComponent from "./SingleReview";
import SearchAndMoreSkeleton from "./SearchAndMoreSkeleton";

const SeeMoreComponent = (props) => {
  const router = useRouter();
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
    </Container>
  );
};

export default SeeMoreComponent;
