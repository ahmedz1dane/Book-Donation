import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import bg from "../img/1.png";

function Home() {
  const [posts, setPosts] = useState([]);

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        // DOUBT: what is post.documents and what
        //        will be there in posts , single or
        //        multiple posts ?

        // ANS: based on the back-end configuration
        //      the data will be fetched as follows
        //
        //      following is just an example
        //      the actual data will be the column
        //      names that is in the appwrite
        //      {
        //      "documents": [
        //        {
        //          "$id": "post-id-1",
        //          "$collection": "posts",
        //          "$permissions": {
        //            "read": ["*"],
        //            "write": ["user-id-1"]
        //          },
        //          "title": "Post 1",
        //          "content": "This is the content of Post 1"
        //        },
        //        {
        //          "$id": "post-id-2",
        //          "$collection": "posts",
        //          "$permissions": {
        //            "read": ["*"],
        //            "write": ["user-id-2"]
        //          },
        //          "title": "Post 2",
        //          "content": "This is the content of Post 2"
        //        },
        //        // ... more posts
        //      ]
        //    }
      }
    });
  }, []);

  if (posts.length === 0 || userData === null) {
    return (
      <div
        className="w-full h-screen text-center"
        style={{
          height: "95vh",
        }}
      >
        {" "}
        {/* Assuming you want the image to take the full height of the screen */}
        <div className="flex flex-wrap h-full">
          {" "}
          {/* Ensure the parent div takes the full height */}
          <div className="w-full h-full">
            <img
              className="w-full h-full object-cover"
              src="https://images.alphacoders.com/132/1326370.png"
              alt="Placeholder"
            />
          </div>
        </div>
      </div>
    );
  }
  // DOUBT: is there a need fo the else keyword?
  // ANS: in javascript the code that jst follows
  //      the if block is implicitly treated as else
  //      block
  return (
    <div
      className="w-full py-8"
      style={{
        marginTop: "50px",
      }}
    >
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) =>
            post.userid === userData.$id ? (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ) : null
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
