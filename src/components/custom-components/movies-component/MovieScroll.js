"use client";

import { convertStringToKebabCase } from "@/utils/url-encoding";
import styles from "./MovieScroll.module.css";
import Link from "next/link";
// import useMovieCategorySearch from "@/hooks/useMovieCategorySearch";

const ImageScroller = ({ filteredMovies, title, seeMore }) => {
  // const { loading, error, filteredMovies } = useMovieCategorySearch(title);

  return (
    <div>
      {filteredMovies?.length > 0 ? (
        <div style={{ marginBottom: 50 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <h5 style={{ fontWeight: "bold" }}>{title}</h5>
            {!seeMore && (
              <div>
                <Link href={`/movies/list/${convertStringToKebabCase(title)}`}>
                  See more
                </Link>
              </div>
            )}
          </div>
          <hr />
          <div className={styles.scrollerContainer}>
            <div className={styles.scroller}>
              {filteredMovies?.map((image, index) => (
                <div key={index} className={styles.imageContainer}>
                  <Link href={`/movies/${image.id}`}>
                    <img
                      src={image.image}
                      alt={`Image ${index + 1}`}
                      className={styles.image}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ImageScroller;
