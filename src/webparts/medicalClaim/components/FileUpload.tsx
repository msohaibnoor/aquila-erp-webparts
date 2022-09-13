import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./MedicalClaim.module.scss";

const FileUpload = ({ files, setFiles, removeFile }) => {
  const uploadHandler = (e: any) => {
    console.log(e.target.files[0]);
    // //@ts-ignore
    // const files = Array.from(e.target.files);
    // files.forEach((file: any) => {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       setFiles(files);
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // });

    const file = e.target.files[0];
    if (!file) return;
    setFiles([...files, file]);

    // upload file
    // const formData = new FormData();
    // formData.append("newFile", file, file.name);
    // axios
    //   .post("http://localhost:8080/upload", formData)
    //   .then((res) => {
    //     file.isUploading = false;
    //     setFiles([...files, file]);
    //   })
    //   .catch((err) => {
    //     // inform the user
    //     console.error(err);
    //     removeFile(file.name);
    //   });
  };

  return (
    <>
      <div className={styles["file-card"]}>
        <div className={styles["file-inputs"]}>
          <input type="file" onChange={(e) => uploadHandler(e)} />
          <button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Upload
          </button>
        </div>

        <p className={styles.main}>Supported files</p>
        <p className={styles.info}> DOCX, PDF, JPG, PNG</p>
      </div>
    </>
  );
};

export default FileUpload;
