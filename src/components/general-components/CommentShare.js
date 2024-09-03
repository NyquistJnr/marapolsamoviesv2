"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import classes from "./CommentShare.module.css";

import { useAuth } from "@/context/AuthContext";

import { Container } from "react-bootstrap";

// Icons
import likeIcon from "../../../public/images/icons/heart.svg";
import commentIcon from "../../../public/images/icons/comment.svg";
import saveIcon from "../../../public/images/icons/save.svg";
import likedSaveIcon from "../../../public/images/icons/likedSave.svg";
import likedHeartIcon from "../../../public/images/icons/likedHeart.svg";

// Social Handle Icons import
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";

import JoinConversationModal from "./JoinModal";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import { auth, db } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import useReviewActions from "@/hooks/useLikeAndSave";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import { PiTelegramLogoBold } from "react-icons/pi";

const BackdropExample1 = (props) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropInvert="80%"
      backdropFilter="blur(5px) hue-rotate(10deg)"
    />
  );

  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <>
      <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <JoinConversationModal />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const CommentShare = (props) => {
  const { isAuthenticated } = useAuth();
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { likedPost, bookmarkPost, handleLike, handleBookmark } =
    useReviewActions(props.id, user, props.optional, props.collection);

  const [newCommentData, setNewCommentData] = useState(
    props.value ? props.value : []
  );

  // Comment Box
  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleNewDataIn = (newData) => {
    setNewCommentData([newData, ...newCommentData]);
  };

  return (
    <Container>
      <BackdropExample1 isOpen={isOpen} onClose={onClose} />
      <section
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", padding: "10px 0" }}>
          <Image
            src={likedPost ? likedHeartIcon : likeIcon}
            alt="Like Icon"
            priority
            width={32}
            style={{ marginRight: 10 }}
            onClick={() => {
              if (isAuthenticated) {
                handleLike();
              } else {
                onOpen();
              }
            }}
          />
          <Image
            src={commentIcon}
            alt="Comment Icon"
            priority
            width={30}
            style={{ marginRight: 10 }}
            onClick={() => {
              if (isAuthenticated) {
                setShowCommentBox((prev) => !prev);
              } else {
                onOpen();
              }
            }}
          />
          <Image
            src={bookmarkPost ? likedSaveIcon : saveIcon}
            alt="Save Icon"
            priority
            width={30}
            style={{ marginRight: 10 }}
            onClick={() => {
              if (isAuthenticated) {
                handleBookmark();
              } else {
                onOpen();
              }
            }}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "10px 0" }}
        >
          <span style={{ marginRight: 10 }}>Share:</span>
          <WhatsappShareButton
            url={`https://www.marapolsamovies.com/${
              props.collection ? props.collection : "reviews"
            }/${props.id}`}
            title="Check out this link!"
            separator=" - "
          >
            <FaWhatsapp size={25} style={{ marginRight: 10 }} />
          </WhatsappShareButton>
          <TwitterShareButton
            url={`https://www.marapolsamovies.com/${
              props.collection ? props.collection : "reviews"
            }/${props.id}`}
            title="Check out this link!"
            /* via="nwaukwa_nyquist" */
          >
            <FaXTwitter size={25} style={{ marginRight: 10 }} />
          </TwitterShareButton>
          <TelegramShareButton
            url={`https://www.marapolsamovies.com/${
              props.collection ? props.collection : "reviews"
            }/${props.id}`}
            title="Check out this link!"
          >
            <PiTelegramLogoBold size={25} style={{ marginRight: 10 }} />
          </TelegramShareButton>
          <FacebookShareButton
            url={`https://www.marapolsamovies.com/${
              props.collection ? props.collection : "reviews"
            }/${props.id}`}
            quote="Check out this link!"
            hashtag="#marapolsamovies"
          >
            <FiFacebook size={25} />
          </FacebookShareButton>
        </div>
      </section>
      <section style={{ marginTop: 20, marginBottom: 20 }}>
        {showCommentBox && (
          <CommentBox
            id={props.id}
            onSaveComment={handleNewDataIn}
            type={props.collection}
          />
        )}
      </section>
      <section style={{ marginTop: 20, marginBottom: 20 }}>
        <CommentList value={newCommentData} />
      </section>
    </Container>
  );
};

export default CommentShare;
