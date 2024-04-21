import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  // console.log(control);
  // control is an object that contain many details
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      {/* What I understood
       */}

      {/* controller is mainly used to integrate external controlled
           components with react-hook-form (Controller is react-hook-form
           component ) By doing so we will be able to manage the changes 
           that are made in the editor more easily */}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          // DOUBT: what is the use of render here ?
          // ANS: it is used to render components , in this we can see
          //      field in which we will pass different events
          //      in the below we can see that the editor is using
          //      this on change event
          <Editor
            apiKey='xyojk6wz55lva64xzmty3kqqz3p19vsaqadrb76aiy4pcj1q'
            initialValue={defaultValue}
            init={{
              initialValue: { defaultValue },
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
            // 1 DOUBT : how is the working of the above onChange
            // ANS: onEditorChange means , if any change is madee to
            //      the editor onChange is called . This onChange will
            //      link that to the state of the form
          />
        )}
      />
    </div>
  );
}
