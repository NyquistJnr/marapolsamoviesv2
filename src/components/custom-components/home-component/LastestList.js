import { Fragment } from "react";
import Lastest from "./Lastest";

import classes from "./Lastest.module.css";
import { Skeleton } from "@chakra-ui/react";

const LoadingSkeleton = () => {
  const dataList = ["1", "2", "3"];
  return (
    <>
      <div>
        <Skeleton style={{ width: 200, marginBottom: 30 }}>Hello</Skeleton>
      </div>
      {dataList.map((data) => (
        <div key={data}>
          <section style={{ display: "flex" }}>
            <div
              style={{
                marginRight: 20,
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Skeleton style={{ width: 180, height: 230, borderRadius: 10 }}>
                Hello
              </Skeleton>
            </div>
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingTop: 10,
              }}
            >
              <div>
                <Skeleton style={{ width: 200 }}>Hello</Skeleton>
                <div className={classes.h2} style={{ marginTop: 10 }}>
                  <Skeleton style={{ height: 50 }}>hello</Skeleton>
                </div>
              </div>
              <div>
                <div className={classes.p} style={{ display: "flex" }}>
                  <span style={{ marginRight: 20 }}>
                    <Skeleton style={{ width: 100 }}>hello</Skeleton>
                  </span>
                  <span>
                    <Skeleton style={{ width: 100 }}>hello</Skeleton>
                  </span>
                </div>
                <div className={classes.p} style={{ marginTop: 10 }}>
                  <Skeleton style={{ width: 150 }}>Hello</Skeleton>
                </div>
                <div className={classes.p} style={{ marginTop: 10 }}>
                  <Skeleton style={{ width: 150 }}>Hello</Skeleton>
                </div>
              </div>
            </div>
          </section>
          <hr
            className={classes.length}
            style={{ opacity: 0.1, border: "1.4px solid" }}
          />
        </div>
      ))}
    </>
  );
};

const LastestList = (props) => {
  if (props.error) {
    return (
      <div className="text-center py-5">
        An Error Occured!, {props.error.message}
      </div>
    );
  }
  return (
    <Fragment>
      {props.isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <h3 style={{ fontWeight: "bold" }}>{props.name}</h3>
          <hr className={classes.length} style={{ border: "1.4px solid" }} />
          {props.data.length < 1 ? (
            <div className="text-center py-5" style={{ fontWeight: "bold" }}>
              No Lastest Review yet!
            </div>
          ) : (
            <>
              {props.data.map((item) => (
                <Lastest {...item} key={Math.random()} />
              ))}
            </>
          )}
        </>
      )}
    </Fragment>
  );
};

export default LastestList;
