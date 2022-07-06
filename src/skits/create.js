import React, { useState } from "react";
import axios from "axios";
import { useStyles } from "./style";
import { getCookie } from "../lookup/components";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import TextFormatSharp from "@material-ui/icons/TextFormatSharp";
import { Button } from "@material-ui/core";
import { Message } from "../message";
import { HOST } from "../config";

export function SkitCreate(props) {
  const { didSkit, openCreate, setOpenCreate, profile, didlookup } = props;
  const initialFormData = Object.freeze({
    content: "",
    image: "",
    caption: "",
  });

  const [postData, updatePostData] = useState(initialFormData);
  const [postImage, setPostImage] = useState(null);

  const [msg, setMsg] = useState("");
  const [btn, setBtn] = useState("");
  const [btn2, setBtn2] = useState("Ok");
  const [showMsg, setShowMsg] = useState(false);
  const [status, setStatus] = useState(true);

  const handleClose = () => {
    setShowMsg(false);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      console.log(e.target.files);
      if (e.target.files[0]) {
        if (!e.target.files[0].type.indexOf("image") - 1) {
          setStatus(false);
          setMsg("This is not an Image");
          setShowMsg(true);
          e.target.value = "";
          document.querySelector(".skt-post-create-img").click();
        } else if (e.target.files[0].type === "image/webp") {
          setStatus(false);
          setMsg("Image format not supported");
          setShowMsg(true);
          e.target.value = "";
          document.querySelector(".skt-post-create-img").click();
        } else {
          setPostImage({
            image: e.target.files,
          });
        }
      }
    }
    if ([e.target.name] === "content") {
      updatePostData({
        ...postData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
      });
    }
    if ([e.target.name] === "caption") {
      updatePostData({
        ...postData,
        [e.target.name]: e.target.value,
      });
    } else {
      updatePostData({
        ...postData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const handleBtn1 = () => {
    var LastLayout = document.querySelector(".create-overlay:last-child");
    LastLayout.style.display = "none";
    if (openCreate === true) setOpenCreate(false);
  };
  const handleHideCreate = () => {
    var condition =
      postData.content.length > 0 || postData.caption > 0 || postData.image > 0;
    console.log(condition);
    if (openCreate === true && !condition) {
      updatePostData({
        ...postData,
        content: "",
        caption: "",
        image: "",
      });
      setOpenCreate(false);
    } else if (openCreate && condition) {
      setMsg("You are about to leave");
      setShowMsg(true);
      setBtn("Leave");
      setBtn2("Stay");
    }
  };

  const handleTextBg = (e) => {
    e.preventDefault();
    var textArea = document.getElementById("post-content"),
      UserImage = document.querySelector(".post-user-img");
    UserImage.classList.add("animate");
    updatePostData({
      ...postData,
      caption: postData.content,
      content: "",
      image: "",
    });
    textArea.setAttribute("name", "caption");
    textArea.setAttribute("rows", "10");
  };
  const handleUpload = (e) => {
    e.preventDefault();
    var textArea = document.getElementById("post-content");
    updatePostData({
      ...postData,
      content: postData.caption,
      caption: "",
      image: "",
    });
    textArea.setAttribute("name", "content");
    textArea.setAttribute("rows", "5");
    document.querySelector(".skt-post-create-img").click();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(postData.content || postData.caption || postData.image) && postData) {
      console.log(!(postData && postData.content));
      console.log(!(postData && postData.caption));
      setMsg("You have to post something.");
      setShowMsg(true);
    } else {
      const csrftoken = getCookie("csrftoken");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrftoken,
        },
      };
      const URL = `${HOST}/api/skits/create/`;
      let formData = new FormData();
      formData.append("content", postData.content);
      formData.append("caption", postData.caption);
      console.log(postData.image);
      if (postData.image && postImage.image[0]) {
        formData.append("image", postImage.image[0]);
      }
      axios
        .post(URL, formData, config)
        .then((res) => {
          if (res.status === 201) {
            var createBtn = document.querySelector("#create-skit-btn");
            createBtn.setAttribute("disabled", "true");
            var x = document.querySelector(".post_count");
            if (x) {
              console.log(x);
              var numb = parseInt(x.innerText.trim()) + 1;
              x.innerText = numb + " ";
            }
            didSkit(res.data);
            updatePostData({
              ...postData,
              caption: "",
              content: "",
            });
            setPostImage({
              image: null,
            });
            setShowMsg(true);
            setMsg("Uploading...");
            setShowMsg(false);
            setOpenCreate(false);
          }
        })
        .catch((err) => {
          if (err.status === 403) {
            setMsg("You Need To Login.");
            setShowMsg(true);
            window.location.href = "/login/";
          } else if (err.status === 400 || err.status === 500) {
            alert("An error occured please try again.");
          }
        });
    }
  };

  const classes = useStyles();

  return (
    openCreate === true &&
    didlookup && (
      <>
        <div
          className="create-overlay create-lay"
          onClick={handleHideCreate}
        ></div>
        <div
          className="skitte-create h-screen fixed pointer-events-none top-0 right-0 left-0 
      display-none bottom-0 flex items-center justify-center"
        >
          {showMsg && msg ? (
            <Message
              msg={msg}
              title="Notice"
              status={!status ? "error" : status ? "success" : null}
              handleClose={handleClose}
              handleBtn1={handleBtn1}
              msgbtn={btn2}
              btn1={btn}
            />
          ) : null}
          {/* <!-- Skitte Create Model --> */}
          <div
            className={`rounded-lg w-3/4 skitte-create-model shadow-lg bg-dark skt-center`}
          >
            {/* <!-- Skitte Create Header --> */}
            <div className="border-b border-green-400 p-4 text-gray-500">
              <div
                className="hover:text-white w-10 rounded-full shadow-lg transition
              bg-green-300 hover:bg-red-400 text-center text-lg cursor-pointer"
                onClick={handleHideCreate}
              >
                x
              </div>
            </div>
            {/* <!-- Skitte Create Body --> */}
            <form
              className={classes.form}
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div className="post-create relative p-4 pl-20">
                <figure className="absolute top-0 left-0 ml-4 mt-4">
                  <img
                    className="rounded-full post-user-img"
                    width="50px"
                    src={profile.image}
                    alt=""
                  />
                </figure>
                {/* skt create content */}

                <textarea
                  name="content"
                  rows="5"
                  placeholder="What's happening?"
                  className="bg-transparent pt-4 w-full text-white-400 text-lg outline-none"
                  id="post-content"
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* <!-- Skitte Create Footer --> */}
              <div className="pl-20 pb-4 skitte-create-btns pr-4 flex justify-between">
                <div className="flex text-2xl items-center cursor-pointer">
                  {/* Upload image */}
                  <div className="mr-2 skt-btn">
                    <Button
                      varient="contained"
                      onClick={handleUpload}
                      title="upload image only"
                      startIcon={<AddAPhotoOutlinedIcon fontSize="large" />}
                    >
                      Upload
                    </Button>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      name="image"
                      className="skt-post-create-img"
                      onChange={handleChange}
                      accept="image/*"
                    />
                  </div>
                  <div className="mr-2 skt-btn">
                    <Button
                      varient="contained"
                      title="upload text with background"
                      startIcon={<TextFormatSharp fontSize="large" />}
                      onClick={handleTextBg}
                    >
                      Text
                    </Button>
                  </div>
                </div>
                <div>
                  <input
                    type="submit"
                    id="create-skit-btn"
                    className="bg-green-500 hover:bg-green-300 rounded-full text-white hover:text-black inline-block py-2 px-4 outline-none cursor-pointer"
                    value="Post"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  );
}
