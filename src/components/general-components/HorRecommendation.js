import { Container } from "react-bootstrap";
import HorizontalScroll from "@/components/basic-ui/horizontal-scroll/HorizontalScroll";
import Link from "next/link";

import classes from "./HorRecommendation.module.css";
import SkeletonHorizontalScroll from "../basic-ui/horizontal-scroll/SkeletonHorizontal";
import { Skeleton } from "@chakra-ui/react";

const HorRecommendation = (props) => {
  if (props.error) {
    return <div className="text-center py-5">An Error Occured.</div>;
  }
  return (
    <section>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "30px 0",
            flexWrap: "wrap",
          }}
        >
          <h4 className="py-2" style={{ fontWeight: "bold" }}>
            {!props.isLoading ? (
              <span>{props.title}</span>
            ) : (
              <Skeleton>Helloooooooooooooo</Skeleton>
            )}
          </h4>
          {!props.seeMore && (
            <>
              {!props.isLoading && (
                <p className={`${classes.seeMoreLink} py-2`}>
                  <Link href={props.to ? props.to : "#"}>See more</Link>
                </p>
              )}
            </>
          )}
        </div>
        <hr style={{ marginBottom: 20, marginTop: -15 }} />

        {!props.isLoading ? (
          <HorizontalScroll data={props.data} />
        ) : (
          <SkeletonHorizontalScroll />
        )}
      </Container>
    </section>
  );
};

export default HorRecommendation;
