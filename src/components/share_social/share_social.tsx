import React from "react";

import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

type Props = {};

export default function ShareSocial({}: Props) {
  const shareUrl = window.location.href;
  return (
    <>
      <div className=" p-2 w-full max-w-2xl bg-white/70  rounded-xl shadow shadow-white min-h-40 h-full">
        <p className=" font-semibold text-2xl text-primary-900 ">
          Interview assessment
        </p>
        <div className=" flex w-full items-end lg:flex-row flex-col ">
          <div className=" w-full ">
            <div className=" flex items-center gap-4 ">
              <img
                src="/assets/images/closed-ai-icon.png"
                alt=""
                className=" w-12 h-12 p-1 rounded-md object-cover "
              />{" "}
              <div>
                <p className=" text-sm font-semibold text-primary-700">
                  Company
                </p>
                <p className=" text-lg  text-primary-700">Closed.AI</p>
              </div>
            </div>
            <div className=" flex items-center gap-4 ">
              <img
                src="/assets/images/my-image.png"
                alt=""
                className=" w-12 h-12 p-1 rounded-md object-cover "
              />{" "}
              <div>
                <p className=" text-sm font-semibold text-primary-700">
                  Author
                </p>
                <p className=" text-lg  text-primary-700">
                  Thuvarakan Selvasothy
                </p>
              </div>
            </div>
          </div>
          <div className="  px-4 py-6 lg:py-1 ">
            <p className=" mb-2 text-primary-700 font-semibold ">Share URL</p>
            <div className=" flex gap-4 items-center h-full justify-end  w-full  ">
              <FacebookShareButton url={shareUrl} hashtag={"#portfolio..."}>
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>

              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={40} round={true} />
              </WhatsappShareButton>

              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={40} round={true} />
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
