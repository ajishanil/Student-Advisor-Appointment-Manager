// importing css for this view
import "../../assets/styles/StudentFiles.css";

// importing react hooks.
// The useState allows to track state of a component.
import { useEffect, useState } from "react";

// importing api for this view
import { downloadFile, getFiles } from "../../api/index";

export default function StudentFiles() {
  useEffect(() => {
    getFiles(sessionStorage.getItem("Id"))
      .then((response) => {
        setList(response.data.data);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }, []);

  const [list, setList] = useState([]);

  const handleClick = (fileName, filePath) => {
    const name = fileName;
    const path = filePath;

    // downloading file
    downloadFile({
      fileName: name,
      filePath: path,
    }).then((response) => {
      // define URL of file to be downloaded
      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      // define link of file to be downloaded
      const link = document.createElement("a");

      // set link's href attribute
      link.href = url;

      // set link's download attribute
      link.setAttribute("download", name);

      // simulate clicking of link
      document.body.appendChild(link);
      
      // click link
      link.click();
    }).catch((e) => {
      alert(e.response.data.message);
    });
  };

  return (
    <div>
      <div className="recent-table m-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {/* data from database will be made into the list and placed into this table rows */}
            {list.map((item, index) => (
              <tr key={index}>
                <td
                 className="fileLink"
                 onClick={sessionStorage.getItem("Role") !== "1" && item.isConfedential ? () => alert("This file is confidential") : () => handleClick(item.fileName, item.filePath)}
                >
                  {item.fileName}
                </td>
                <td>{item.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
