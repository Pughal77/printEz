import { useState, useEffect } from "react";
import PrintFile from "./printFile";

function FileUpload({ socket }) {
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [isWarning, setIsWarning] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
    }

    const handleUpload = async(e) => {
        e.preventDefault();
        if (isFilePicked) {
            console.log(selectedFile);
            
            socket.emit("pdfTransfer", selectedFile, (status) => {
                console.log(status);
            });
        } else {
            setIsWarning(true);
            setTimeout(() => {
                setIsWarning(false);
              }, 1500);
        }
    }

    useEffect(()=> {
        socket.on("missingCredentials", () => {
            // force the page to reload, credentials misssing
            window.location.reload(false);
        })
        socket.on("fileUploaded", () => {
            console.log("FILE UPLOADED");
            setIsUploaded(true);
            // setTimeout(() => {
            //     setIsUploaded(false);
            //   }, 15000);
        })
    }, [socket]) 

    return ( 
        <div className="fileupload">
            <h2>UPLOAD YOUR PDF</h2>
            <form onSubmit={handleUpload}>
                <input 
                    type="file"
                    onChange={handleFileChange}
                />
                <button>upload</button>
            </form>
            {isWarning && 
                <p>Please Choose A File</p>
            }
            {isUploaded && 
                <div>
                    <p>File Successfully Uploaded</p>
                    < PrintFile
                        socket={socket} 
                    />
                </div>
            }
        </div>
     );
}
 
export default FileUpload;