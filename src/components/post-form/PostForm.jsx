import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authservice from "../../appwrite/auth";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        // 1. DOUBT:wheter these defaultValue and
        //       and title are keywords or not ?

        //       why . is used after the question mark?

        // what I understand :
        // defaultValues is keyword and others
        // are the name of the different inputBox
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    // if post is already there then we need to
    // update that post
    if (post) {
      // console.log(post);
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      // 2 DOUBT: what upload file will be returning ?
      // 3 DOUBT : what is the difference between feaatured
      //         image and image[0]

      if (file) {
        appwriteService.deleteFile(post.featuredimage);
      }
      
      const dbpost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredimage: file ? file.$id : undefined,
      });

      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
    }

    // 4 DOUBT: find the use of $id that is used above

    // 5 DOUBT: why need to upload into image and then
    //        to post , why cant we do it directly ?
    else {
      const file = await appwriteService.uploadFile(data.image[0]); //DOUBT: why image[0] instead of image ? ANS: cause here type="file" is used which allows multiple files that is an object manner , therefore image[0] alows us to take the first image in that object
      // when we execute the above appwite function the data tha is returned
      // will be as follows:
      // $createdAt
      // :
      // "2024-01-12T11:56:59.028+00:00"
      // $id
      // :
      // "65a1290ab7e259ec0eb3"
      // $permissions
      // :
      // (3) ['read("user:659be33ead2f63a593e9")', 'update("user:659be33ead2f63a593e9")', 'delete("user:659be33ead2f63a593e9")']
      // $updatedAt
      // :
      // "2024-01-12T11:56:59.028+00:00"
      // bucketId
      // :
      // "656f9c12c56283d4b43d"
      // chunksTotal
      // :
      // 1
      // chunksUploaded
      // :
      // 1
      // mimeType
      // :
      // "image/jpeg"
      // name
      // :
      // "sean-oulashin-KMn4VEeEPR8-unsplash (1).jpg"
      // signature
      // :
      // "d2d745024d4557ff2ad4b008db34fe98"
      // sizeOriginal
      // :
      // 493726
      // [[Prototype]]
      // :
      // Object
      const userData = await authservice.getCurrentuser()
      const phone = userData.phone
      if (file) {
        const fileId = file.$id;
        // 6 DOUBT : from where does we got  this file.$id and what is it ?
        // ANS: you can see the answer for this in the above comments

        data.featuredimage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userid: userData.$id,
          phone:phone
          // 7 DOUBT : what is the $id that is specified above
          // ANS: userData is the data that we pass to store when we
          //      login or signin , in that we can see this $id
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  // usage of useCallBack
  // --------------------

  // by using the useCallback in the following , we are
  // actually increasing the perfomance of our code
  // by using useCallback we are actually memorizing the
  // particular result of this function and we doesnt run
  // this each renders and this function will be only runned
  // when any of  the dependency changes

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
      // here in this case 'g' means all the occurences
      // are replaced instead of just the first occurence
    }

    return "";
  }, []);

  React.useEffect(() => {
    // 8 DOUBT: why watch is used ?
    // ANS: is used to watch a particular field in the form , the callback
    //      function in it will be fired each time there is change in the
    //      form
    //      in the following we can see that , we are using value and {name }
    //      value is an object containing each form elements we used
    //      if we make any changes in any of the field it will be shown in
    //      that object
    //      where as name is also an object which contains details of the
    //      field in which we had made changes
    //      eg:{name: 'title', type: 'change', values: {…}}
    //      but here we only need the name in it when we make the change
    //      so we jst destructure it as { name }
    const subscription = watch((value, { name }) => {
      // console.log(name);
      // console.log(value);
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
    // 9 DOUBT : why call back function is used in the return
    // ANS:      we have to unsubscribe it to avoid memory cleanups
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        {/* DOUBT: why we are not using register to link
                   RTE to form
            ANS: cause RTE is an external thing so we cannot
                 use register . Instead we can see that in the
                 RTE component we are using the <Controller>
                 element to do this thing */}
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
