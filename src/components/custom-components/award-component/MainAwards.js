import { useRouter } from "next/navigation";
import CommentShare from "@/components/general-components/CommentShare";
import MainSearchFilterBar from "@/components/general-components/MainSearchFilter";
import { Button, Container } from "react-bootstrap";
import TrendingNews from "../news-component/TrendingNews";
import usePostDetails from "@/hooks/usePostDetail";
import { Skeleton } from "@chakra-ui/react";
import { FaArrowLeftLong } from "react-icons/fa6";

const AwardsComponents = (props) => {
  const router = useRouter();
  const { data, loading, error, formattedDate } = usePostDetails(
    "awards",
    props.awardId
  );

  if (loading)
    return (
      <Container style={{ height: "55vh" }}>
        <div style={{ margin: "50px 0 50px 0" }}>
          <Skeleton style={{ height: 28, width: "70%" }} />
          <div className="py-3">
            <Skeleton style={{ height: 18, width: 150 }} />
          </div>
          <Skeleton style={{ height: 18, width: 280, marginBottom: 10 }} />
          <Skeleton style={{ height: 18, width: 280, marginBottom: 10 }} />
          <Skeleton style={{ height: 18, width: 280, marginBottom: 10 }} />
          <Skeleton style={{ height: 18, width: 280, marginBottom: 10 }} />
          <Skeleton style={{ height: 18, width: 280, marginBottom: 10 }} />
        </div>
      </Container>
    );
  return (
    <>
      <MainSearchFilterBar placeholder="awards" />
      <Container>
        <div style={{ marginBottom: 40 }}>
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              color: "#575655",
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            onClick={() => router.back()}
          >
            <FaArrowLeftLong style={{ marginRight: 10 }} />
            Back
          </Button>
        </div>
        <section>
          <h2 style={{ fontWeight: "bold", fontSize: 35 }} className="col-md-6">
            {data.title}
          </h2>
          <div style={{ marginTop: 30 }}>
            <b>Published:</b> {formattedDate}
          </div>
          <div style={{ marginBottom: 100 }}>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        </section>
        {error && (
          <div className="text-center py-5" style={{ height: "40vh" }}>
            An Error Occured, {error.message}
          </div>
        )}
        <CommentShare
          collection="awards"
          value={data?.comments}
          id={props.awardId}
          optional={data}
        />
        <TrendingNews title="Recommended News" />
      </Container>
    </>
  );
};

export default AwardsComponents;
