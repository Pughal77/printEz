import { useState } from "react";
import FileUpload from "../components/UserPage/FileUpload";
import PrintFile from "../components/UserPage/PrintFile";
import JobQ from "../components/UserPage/JobQ";

function UserPage({username , socket}) {
    const [isUploaded, setIsUploaded] = useState(false);
    const [jobCreated, setjobCreated] = useState(false);
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
                    < JobQ socket={socket}/>
                </div>
            }
        </div>
     );
}
 
export default UserPage;