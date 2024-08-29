"use client";

import { Button, Container } from "react-bootstrap";
import classes from "./SearchedReview.module.css";

import { FaArrowLeftLong } from "react-icons/fa6";
import SingleReviewComponent from "./SingleReview";
import SearchAndMoreSkeleton from "./SearchAndMoreSkeleton";

const SearchedReview = (props) => {
  if (props.error) {
    return (
      <div className="text-center py-5">
        An Error Occured: {props.error.message}
      </div>
    );
  }
  const handleSearchFilter = () => {
    props.handleGoBack("");
  };

  // console.log(props.data);

  let title = props.title;

  if (title == "movies") {
    title = "Movies";
  } else if (title == "TV Shows") {
    title = "TV Shows";
  } else if (title == "action") {
    title = "Action Genre";
  } else if (title == "adventure") {
    title = "Adventure Genre";
  } else if (title == "comedy") {
    title = "Comedy Genre";
  } else if (title == "sci-fi") {
    title = "Sci-fi Genre";
  } else if (title == "horror") {
    title = "Horror Genre";
  } else if (title == "drama") {
    title = "Drama Genre";
  } else if (title == "thriller") {
    title = "Thriller Genre";
  } else if (title == "fantasy") {
    title = "Fantasy Genre";
  } else if (title == "romance") {
    title = "Romance Genre";
  } else if (title == "crime") {
    title = "Crime Genre";
  } else if (title == "nollywood") {
    title = "Nollywood";
  } else if (title == "hollywood") {
    title = "Hollywood";
  } else if (title == "bollywood") {
    title = "Bollywood";
  } else if (title == "KDrama") {
    title = "KDrama";
  } else if (title == "netflix") {
    title = "Netflix";
  } else if (title == "prime-video") {
    title = "Prime-Video";
  } else if (title == "disney+") {
    title = "Disney+";
  } else if (title == "showmax") {
    title = "Showmax";
  } else if (title == "youtube") {
    title = "Youtube";
  } else {
    title = `Search Results for "${props.title}"`;
  }

  return (
    <Container>
      <Button
        onClick={handleSearchFilter}
        className={classes.goBackBtn}
        style={{ display: "flex", alignItems: "center" }}
      >
        <FaArrowLeftLong size={20} style={{ marginRight: 10 }} /> Back
      </Button>
      <h2 style={{ marginTop: 30, fontWeight: "bold", fontSize: 30 }}>
        {title} Reviews
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
            <div className="text-center py-5">
              No review with the searched word
            </div>
          )}
        </section>
      )}
    </Container>
  );
};

export default SearchedReview;
