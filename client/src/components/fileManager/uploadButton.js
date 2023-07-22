import { useRef } from "react";

import { ThemeProvider } from '@emotion/react';

import MyButton from "../../style/MyButton";
import { theme } from '../../style/style';

export default function UploadButton({handleFileChange}) {
    const hiddenFileInput = useRef(null);
  
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        handleFileChange(fileUploaded);
    };
    return (
        <ThemeProvider theme={theme}>
            <MyButton 
                handleClick={handleClick} 
                text="upload a file" 
                addStyle={{width: '150px', mb: "10px"}} 
            />
            <input type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{display:'none'}} 
            /> 
        </ThemeProvider>
    );
}