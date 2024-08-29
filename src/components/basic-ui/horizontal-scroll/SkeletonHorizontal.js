import { Container } from "react-bootstrap";
import classes from "./HorizontalScroll.module.css";
import { Skeleton } from "@chakra-ui/react";

const data = ["1", "2", "3", "4"];

const SkeletonHorizontalScroll = (props) => {
  return (
    <Container>
      <main className={classes.bodyContainer}>
        {data?.map((item) => (
          <section key={item} className="col-12 col-sm-12 col-md-6 col-lg-3">
            <Skeleton
              style={{ marginRight: 25, height: 200, borderRadius: 10 }}
            >
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
          </section>
        ))}
      </main>
    </Container>
  );
};

export default SkeletonHorizontalScroll;
