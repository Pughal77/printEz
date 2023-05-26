import { useState } from "react"

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState()
	const [isFilePicked, setIsFilePicked] = useState(false)

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
        setIsFilePicked(true);
    }

    const handleUpload = (e) => {
        e.preventDefault()
        if (isFilePicked) {
            console.log(selectedFile)
        }
        
    }

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
        </div>
     );
}
 
export default FileUpload;