import Link from "next/link";
import News from "./News";

const NewsList = (props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>{props.name}</h3>
        <div>
          <Link href="/news">See more</Link>
        </div>
      </div>
      <hr />
      <div className="row">
        {props.data.map((item) => (
          <div
            className="col-12 col-sm-12 col-md-6 col-lg-4"
            key={Math.random()}
          >
            <News {...item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default NewsList;
