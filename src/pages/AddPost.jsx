import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div
      className="py-8"
      style={{
        marginTop: "70px",
      }}
    >
      <Container>
        {/* DOUBT: we are not passing any props here */}
        {/* ANS: here we are giving postForm tag as child
                 for the container tag , therefore it is
                 considered as a prop , so we doesnt need
                 to explicitly pass a prop here */}
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
