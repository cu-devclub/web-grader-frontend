import React,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Test() {
    const loginRedir  = async () => {
        const filename = "Release_1_Ch5_2 Tuple.ipynb"

        fetch(`http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}/glob/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename: filename })
        })
        .then(response => response.json())
        .then(data => {
            // Handle JSON data
            console.log('JSON Data:', data);

            // Download file
            const blob = new Blob([data.fileContent], { type: data.fileType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = data.downloadFilename;
            document.body.appendChild(a);
            a.click();
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
