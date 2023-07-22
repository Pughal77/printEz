import { useState, useEffect } from "react";


import { ThemeProvider } from "@emotion/react";

import { theme } from "../../style/style";
import UploadButton from "./uploadButton";

export default function UploadFile({socket, setPDFWarning}){
    const [selectedFile, setSelectedFile] = useState();
    const [isPDF, setIsPDF] = useState(false);
    
    function removeSpecialCharacter(s) {
        let t = ""
        // length -3 here to remove the additional "pdf" at the end
        for (let i=0; i<s.length - 3; i++)
            if((s[i]>='a' && s[i]<='z') || (s[i]>='A' && s[i]<='Z') || (s[i] >='0' && s[i] <='9'))
                t+=s[i];
        return t + ".pdf";
    }

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
            const fileName = removeSpecialCharacter(selectedFile.name);
            console.log(fileName)
            socket.emit("pdfTransfer", { selectedFile, fileName })
            setIsPDF(false);
        }
    }, [selectedFile])
    

    return (
        <ThemeProvider theme={theme}>
            <UploadButton handleFileChange={handleFileChange} />
        </ThemeProvider>
    )
}