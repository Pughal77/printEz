import { useState, useEffect } from "react";


import { ThemeProvider } from "@emotion/react";

import { theme } from "../style/style";
import UploadButton from "./uploadButton";

export default function UploadFile({socket, setPDFWarning}){
    const [selectedFile, setSelectedFile] = useState();
    const [isPDF, setIsPDF] = useState(false);
   

    const handleFileChange = (file) => {
        if (file != null) {
            if (file.type === "application/pdf") {
                setIsPDF(true);
                setSelectedFile(file);
            } else {
                setPDFWarning(true);
            }
        }
    }

    useEffect(() => {
        if (isPDF) {
            console.log(selectedFile);
        
            socket.emit("pdfTransfer", selectedFile, (status) => {
                console.log(status);
            });
        }
    }, [selectedFile])
    

    return (
        <ThemeProvider theme={theme}>
            <UploadButton handleFileChange={handleFileChange} />
        </ThemeProvider>
    )
}