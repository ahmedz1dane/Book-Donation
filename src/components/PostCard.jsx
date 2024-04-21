import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimage }) {
  return (
    // here $id is the id of the postcard
    // DOUBT: why $ used check it at last:
    // ANS: $id is the slug in appwrite id is written as $id

    // and the id of the image is feaaturedImage
    // because in the database the image will be
    // stored as id

    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredimage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
