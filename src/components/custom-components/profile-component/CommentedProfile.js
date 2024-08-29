import Image from "next/image";
import styles from "./CommentedProfile.module.css";

// Icons
import likeIcon from "../../../../public/images/icons/heart.svg";
import commentIcon from "../../../../public/images/icons/comment.svg";
import saveIcon from "../../../../public/images/icons/save.svg";
import likedSaveIcon from "../../../../public/images/icons/likedSave.svg";
import likedHeartIcon from "../../../../public/images/icons/likedHeart.svg";
import Link from "next/link";

const CommentedProfile = ({
  title,
  author,
  date,
  content,
  imageSrc,
  userComments,
  totalComments,
  postId,
}) => {
  return (
    <>
      <div className="d-block d-md-flex">
        <Image
          src={imageSrc}
          alt="Movie Poster"
          className={styles.imgStyle}
          width={150}
          height={150}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: 10,
          }}
        />
        <div className={styles.postContent}>
          <div>
            <h3 style={{ marginTop: 10, fontWeight: "bold", fontSize: 20 }}>
              <Link href={`/reviews/detail?id=${postId}`}>{title}</Link>
            </h3>
            <p style={{ fontSize: 15 }}>{content}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex" }}>
              <p style={{ marginRight: 20 }}>
                by <b>{author}</b>
              </p>
              <p>{date.toDate().toLocaleString()}</p>
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <Image src={likeIcon} alt="LikeIcon" priority />
                <span style={{ marginLeft: 7 }}>34</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <Image src={commentIcon} alt="CommentIcon" priority />{" "}
                <span style={{ marginLeft: 7 }}>{totalComments}</span>
              </div>
              <Image
                src={saveIcon}
                alt="SaveIcon"
                priority
                style={{ marginRight: 15 }}
              />
            </div>
          </div>
        </div>
      </div>
      {userComments?.map((data) => (
        <section key={Math.random()}>
          <div
            style={{
              height: 40,
              borderLeft: "2px solid #CDCCCC",
              marginLeft: 30,
            }}
          ></div>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image
                src={data.profile_pic}
                alt="Dp"
                className={styles.dpStyles}
                priority
                width={45}
                height={45}
                style={{
                  objectFit: "cover",
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  objectPosition: "center",
                }}
              />
              <div style={{ marginLeft: 15 }}>
                <b>@{data.username}</b> |{" "}
                {data.timestamp.toDate().toLocaleString()}
              </div>
            </div>
            <div style={{ marginLeft: 70 }}>
              <div>{data.text}</div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 15,
                    marginTop: 10,
                  }}
                >
                  <Image src={commentIcon} alt="LikeIcon" priority />
                  <span style={{ marginLeft: 7 }}>{totalComments}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default CommentedProfile;
