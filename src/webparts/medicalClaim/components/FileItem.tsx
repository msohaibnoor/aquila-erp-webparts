import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./MedicalClaim.module.scss";

const FileItem = ({ file, deleteFile }) => {
  return (
    <>
      <li className="file-item" key={file.name}>
        <FontAwesomeIcon icon={faFileAlt} />
        <p>{file.name}</p>
        <div className="actions">
          <div className="loading"></div>

          <FontAwesomeIcon
            className={styles.pointer}
            icon={faTrash}
            onClick={() => deleteFile(file.name)}
          />
        </div>
      </li>
    </>
  );
};

export default FileItem;
