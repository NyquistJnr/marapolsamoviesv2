import { Skeleton } from "@chakra-ui/react";
import classes from "./Popular.module.css";

const PopularSkeleton = (props) => {
  const dataList = ["1", "2", "3"];
  return (
    <>
      <Skeleton style={{ width: 150, height: 25 }} />
      {dataList.map((data) => (
        <div key={data}>
          <section>
            <div style={{ marginTop: 30 }}>
              <Skeleton
                style={{ width: "100%", height: 130, borderRadius: 10 }}
              />
            </div>
            <div style={{ marginTop: 20, width: "90%" }}>
              <Skeleton style={{ width: 150, height: 20, marginBottom: 10 }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Skeleton style={{ width: 150, height: 20 }} />
                </div>
                <div>
                  <Skeleton
                    style={{ width: 100, height: 40, borderRadius: 10 }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      ))}
    </>
  );
};

export default PopularSkeleton;
