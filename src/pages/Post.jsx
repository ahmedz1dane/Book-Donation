import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {


  
 // Replace with the actual phone number
  const handleWhatsAppClick = (phoneNumber) => {
    console.log(phoneNumber);
    const number=phoneNumber
    const encodedPhoneNumber = encodeURIComponent(number);
    // Redirect to the WhatsApp profile of the book owner
    window.location.href = `https://api.whatsapp.com/send?phone=${encodedPhoneNumber}`;
  };



  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    // post.$id and slug are same
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div
      className="py-8"
      style={{
        marginTop: "50px",
      }}
    >
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredimage)}
            alt={post.title}
            style={{
              height: "70vh",
            }}
            className="rounded-xl "
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
          <div className="absolute left-16 top-6 ">
          
            <Button 
            style={{backgroundColor:`#f3f4f6`}}
            onClick={() => handleWhatsAppClick(post.phone)}>
                <img
                  style={{ width: '38px', height: '38px' }}
                  src="https://cdn.iconscout.com/icon/free/png-512/free-whatsapp-155-721985.png?f=webp&w=256"
                  alt="Placeholder"
                />
            </Button>
        
    
           </div>
        </div>
        
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
        {/* DOUBT : why in the above line parse is used
            ANS: cause when we check the appwrite we can see
                 that the content will be written in the html
                 format , so when we are using that in our 
                 page we need to convert that in to normal 
                 text , thats why we are importing and using
                 parse */}
      </Container>
    </div>
  ) : null;
}
