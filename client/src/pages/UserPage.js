import { useState } from "react";
import FileUpload from "../components/FileUpload";
import PrintFile from "../components/PrintFile";

function UserPage({username , socket}) {
    const [isUploaded, setIsUploaded] = useState(false);
    return ( 
        <div className="userPage">
            <h1>Welcome, {username}</h1>
            <FileUpload 
                isUploaded={isUploaded} 
                setIsUploaded={setIsUploaded} 
                socket={socket}
            />
            {isUploaded && 
                <div>
                    < PrintFile
                        socket={socket} 
                    />
                </div>
            }
        </div>
     );
}
 
export default UserPage;