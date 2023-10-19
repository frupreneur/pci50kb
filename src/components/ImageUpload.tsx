import React, { useState } from "react";
// import * as dropZone from "react-dropzone";
import { handleCompression } from "../../utils";
// import ai from "react-icons/ai";
import Select from "react-select";

// const { AiOutlineLoading } = ai;
// const { useDropzone } = dropZone;

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
type imagePreview = {
  name: string;
  oldSize: number;
  newSize: number;
  url: string;
};
const compressionValueOptions = [
  { value: 20000, label: "20KB" },
  { value: 50000, label: "50KB" },
  { value: 100000, label: "100KB" },
  { value: 200000, label: "200KB" },
  { value: 250000, label: "250KB" },
];
export default function ImageUpload() {
  const [files, setFiles] = React.useState<File[] | []>([]);
  const [preview, setPreview] = useState<imagePreview[] | []>([]);
  const [converting, setConverting] = useState<true | false>(false);
  const [compressionValue, setCompressionValue] = useState<
    (typeof compressionValueOptions)[0]
  >(compressionValueOptions[1]);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setConverting(true);
    setFiles([...acceptedFiles]);
  }, []);
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDownload = () => {
    if (preview) {
      const link = document.createElement("a");
      link.href = preview[0].url;
      link.download = "compressed" + preview[0].name; // Change this to desired file name
      link.click();
    }
  };

  React.useEffect(() => {
    setFiles([]);
    setPreview([]);
    setConverting(false);
  }, [compressionValue]);

  React.useEffect(() => {
    if (files.length > 0) {
      (async () => {
        const compressedFile = await handleCompression(
          files[0],
          compressionValue.value
        );
        let url = URL.createObjectURL(compressedFile as File);

        if (compressedFile) {
          setConverting(false);
          setPreview([
            {
              name: files[0].name,
              oldSize: files[0].size,
              newSize: compressedFile.size,
              url,
            },
          ]);
        }
      })();
    }
  }, [files, compressionValue.value]);

  return (
    <>
      <div className="flex justify-center gap-2 items-center my-2">
        <p className="">
          Convert To: <span className="text-primary">{`=>`}</span>
        </p>
        <label htmlFor="react-select-select-box-input">
          <Select
            className=""
            options={compressionValueOptions}
            defaultValue={compressionValue}
            // @ts-ignore
            onChange={setCompressionValue}
            instanceId="select-box"
          />
        </label>
      </div>
      {/* <div
        className="flex w-full h-[150px] justify-center items-center border-dashed border-2 border-sky-500 my-5 "
      //   {...getRootProps()}
      //   style={{ backgroundColor: isDragActive ? "#FFFAFA" : "" }}
      // >
      //   <input {...getInputProps()} />
      //   {isDragActive ? (
      //     <p>Drop the files here ...</p>
      //   ) : (
      //     <p>{`Drag 'n' drop Image here`}</p>
      //   )} */}
      {/* </div> */}
      <input
        type="file"
        name="nameFOR"
        id="nameFOR"
        style={{ display: "none" }}
        onChange={(event: any) => {
          setConverting(true);
          setFiles([event.target.files[0]]);
        }}
      />
      {/* <p>OR</p> */}
      <label
        htmlFor={`${converting ? "" : "nameFOR"}`}
        className={`bg-primary max-w-sm min-w-full mx-auto rounded text-secondary p-2 my-5 cursor-pointer ease-linear duration-300 hover:tracking-widest hover:ease-linear ${
          converting ? "bg-tertiary" : " "
        }`}
      >
        {!converting ? (
          "Click HERE to Select Image"
        ) : (
          <div className="w-full flex justify-center items-center gap-2 text-center ">
            {/* <div>
              <AiOutlineLoading className="mx-auto animate-spin " />
            </div> */}
            <div className="">Converting. Please Wait...</div>
          </div>
        )}
      </label>

      {preview[0] && (
        <div className="w-full h-full">
          <div className="w-full h-1 rounded bg-[gray]"></div>
          <h2>PREVIEW</h2>
          <div className="w-full h-1 rounded bg-[gray]"></div>
          <div className="previewBody w-full h-full flex flex-col md:flex-row items-center justify-center p-5 gap-5">
            <img
              src={preview[0].url}
              alt="Image preview"
              width={300}
              height={300}
            />
            <div className="previewDetails h-full text-left flex flex-col justify-between gap-2 ">
              <p>
                <span className="text-primary">Name:</span> {preview[0].name}
              </p>
              <p>
                <span className="text-primary">Old file size:</span>{" "}
                {preview[0].oldSize > 100000
                  ? (preview[0].oldSize / 1000000).toFixed(2) + "MB"
                  : (preview[0].oldSize / 1000).toFixed(2) + "kb"}
              </p>
              <p>
                <span className="text-primary">New file size:</span>{" "}
                {(preview[0].newSize / 1000).toFixed(2) + "kb"}
              </p>
              <p>
                <span className="text-primary"> Percent reduced:</span>{" "}
                {100 - (preview[0].newSize / preview[0].oldSize) * 100 + "%"}
              </p>
              <button className="btn mx-0" onClick={handleDownload}>
                {" "}
                DOWNLOAD
              </button>
            </div>
          </div>
          <div className="w-full h-1 rounded bg-[gray]"></div>
        </div>
      )}
    </>
  );
}
