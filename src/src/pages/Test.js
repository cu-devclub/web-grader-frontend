import React,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Test() {
    const loginRedir  = async () => {
        fetch(`http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}/glob/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fileRequest: `3_0_1` })
        })
        .then(response => response.json())
        .then(data => {
            // Handle JSON data
            console.log('JSON Data:', data);
        
            // Decode base64-encoded file content
            const decodedFileContent = atob(data.fileContent);
        
            // Convert decoded content to a Uint8Array
            const arrayBuffer = new Uint8Array(decodedFileContent.length);
            for (let i = 0; i < decodedFileContent.length; i++) {
                arrayBuffer[i] = decodedFileContent.charCodeAt(i);
            }
        
            // Create a Blob from the array buffer
            const blob = new Blob([arrayBuffer], { type: data.fileType });
        
            // Create a temporary URL to the blob
            const url = window.URL.createObjectURL(blob);
        
            // Create a link element to trigger the download
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = data.downloadFilename;
            document.body.appendChild(a);
            a.click();
        
            // Clean up by revoking the object URL
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        document.body.style.backgroundColor = "#F2F2F2"
    })

  return (
    <div className="container align-items-center align-content-center" style={{background: "#FFF", borderWidth: "2px", borderStyle: "solid", borderRadius: "2px", width: "70vw", height: "50vh", marginTop: "25vh", marginRight: "15vw"}}>
        <button onClick={() => loginRedir()} className="btn btn-outline-dark" type="button" style={{marginTop: "20px", marginLeft: "20px"}}>Test</button>
    </div>
  );
}


export default Test;
