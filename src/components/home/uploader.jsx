"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import { db } from "@/lib/db";
import copy from "copy-to-clipboard";
import { toast } from "sonner";
import LoadingSvg from "../../assets/loading2.svg";
export function Uploader() {
  // console.log(LoadingSvg);

  const [loading, setLoading] = useState(false);
  const [over, setOver] = useState(false);

  const uploadHandler = (form) => {
    setLoading(() => true);
    fetch("/upload", {
      body: form,
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        insertDatas(res);
        copyLink(res[0]);
      })
      .finally(() => {
        setLoading(() => false);
      });
  };
  const copyLink = (i) => {
    const link = location.origin + i.src;
    copy(link);
    toast.success("复制成功！");
  };
  const insertDatas = (res) => {
    db.image.bulkPut(
      res.map((t) => ({
        src: t.src,
        size: 0,
        createAt: new Date(),
      }))
    );
  };

  const selectFile = () => {
    if (loading) {
      return;
    }
    const fileEle = document.createElement("input");
    fileEle.type = "file";
    fileEle.accept = "image/jpeg, image/png, image/gif, video/mp4";
    fileEle.onchange = () => {
      const form = new FormData();
      form.append("file", fileEle.files[0]);
      uploadHandler(form);
    };
    fileEle.click();
  };
  const dragover = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(e)
  };
  const dragenter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOver(() => true);
    // console.log(e)
  };
  const dragleave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOver(() => false);
    // console.log(e)
  };
  const dropFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOver(() => false);
    // console.log(e, "dropFile EvENT");
    const ext = /(.jpeg|.jpg|.png|.gif|.mp4)$/i;
    const form = new FormData();
    let formOK = false;
    if (e.dataTransfer.items) {
      const list = [...e.dataTransfer.items];
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const file = item.getAsFile();
        if (ext.test(file.name)) {
          form.append("file", file);
          formOK = true;
          break;
        }
      }
      if (formOK) {
        uploadHandler(form);
      }
    }
  };

  return (
    <>
      <div
        onClick={selectFile}
        onDrop={dropFile}
        onDragOver={dragover}
        onDragEnter={dragenter}
        onDragLeave={dragleave}
        className={cn(
          "flex flex-col items-center max-w-96 m-auto justify-center p-10 text-center cursor-pointer border border-slate-400 rounded bg-sky-100/[0.3] hover:bg-sky-200/[0.5] duration-300",
          loading && "cursor-not-allowed",
          over && "bg-teal-500/[0.3]"
        )}
      >
        {loading ? <img width={24} src={LoadingSvg.src} alt="loading" /> : ""}
        {over ? (
          <>
          <span className="text-sm">已选中文件</span>
            <span className="text-sm">松开上传！</span>
          </>
        ) : (
          <>
            <span className="text-sm">选择一个 jpeg/png/gif/mp4 文件</span>
            <span className="text-sm">将 拖动文件到这里</span>
          </>
        )}
      </div>
    </>
  );
}
