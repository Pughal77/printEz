import { useState, useEffect } from "react";


import { ThemeProvider } from "@emotion/react";

import { theme } from "../../style/style";
import UploadButton from "./uploadButton";

export default function UploadFile({socket, setPDFWarning, readFiles}){
    const [selectedFile, setSelectedFile] = useState();
    const [isPDF, setIsPDF] = useState(false);
   

    const handleFileChange = (file) => {
        if (file != null) {
            if (file.type === "application/pdf") {
                setIsPDF(true);
                setSelectedFile(file);
                setPDFWarning(false);
            } else {
                setPDFWarning(true);
            }
        }
    }

    useEffect(() => {
        if (isPDF) {
            const fileName = selectedFile.name.split(' ').join('_')
            console.log(fileName)
            socket
            .emit("pdfTransfer", { selectedFile, fileName })
            
        }
        socket.emit("readFilesReq")
    }, [socket, selectedFile, isPDF])
    

    return (
        <ThemeProvider theme={theme}>
            <UploadButton handleFileChange={handleFileChange} />
        </ThemeProvider>
    )
}