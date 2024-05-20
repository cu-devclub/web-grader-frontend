import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import Navbarprof from '../../components/Navbarprof'
import { useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// const Email = Cookies.get('email');
const host = `http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}`
// const classData = {
//     classid: sessionStorage.getItem("classid"),
//     ClassID: sessionStorage.getItem("ClassID"),
//     SchoolYear: sessionStorage.getItem("SchoolYear"),
//     ClassName: sessionStorage.getItem("ClassName"),
//     Thumbnail: sessionStorage.getItem("Thumbnail")
// }

function ClassEdit() {
    const navigate = useNavigate();
    const [classData,] = useState({
        classid: sessionStorage.getItem("classid"),
        ClassID: sessionStorage.getItem("ClassID"),
        SchoolYear: sessionStorage.getItem("SchoolYear"),
        ClassName: sessionStorage.getItem("ClassName"),
        Thumbnail: sessionStorage.getItem("Thumbnail")
    })
    // const [Email, setEmail] = useState(Cookies.get('email'))

    const CSYID = classData.classid;

    const [classID, setClassID] = useState('');
    const [schoolYear, setSchoolYear] = useState('');
    const [className, setClassName] = useState('');

    
    useEffect(() => {
        const PreData = async () => {
            if (classData) {
            setClassID(classData.ClassID||"");
            setSchoolYear(classData.SchoolYear||"");
            setClassName(classData.ClassName||"");
        }}
        PreData();
        
      }, [classData]);

    const handleEditClick = async () => {
        const formData = new FormData();
        formData.append('ClassName', className);
        formData.append('ClassID',classID)
        formData.append('SchoolYear',schoolYear)
        formData.append('CSYID',CSYID)
  
        try {
            const response = await fetch(`${host}/TA/class/edit`, {
                method: 'POST',
                body: formData,
            });
            const responseData = await response.json();
            console.log(responseData);
            if (responseData.Status){
                withReactContent(Swal).fire({
                    title: "Infomation updated successfully",
                    icon: "success"
                }).then(ok => {
                    if(ok)
                        window.location.href = "/"
                });
            }else{
                withReactContent(Swal).fire({
                title: "Error!",
                icon: "error"
                })
            }
        } catch (error) {
            withReactContent(Swal).fire({
                title: "Please contact admin!",
                text: error,
                icon: "error"
            })
        }
    }
  
    const [timestamps, setTimestamps] = useState(Array(2).fill('')); // กำหนดขนาดของอาร์เรย์ตามจำนวนที่ต้องการใช้งาน (ในที่นี้คือ 2)

    const handleUpload = async (index) => {
      // Get the current date and time
      const now = new Date();
      const formattedTimestamp = now.toLocaleString();
      const response = null
  

      /* Thumbnail */
      if(index === 0){
        const fileInput = document.getElementById('inputGroupFile01');
        const fileThumbnail = fileInput.files[0];

        const formData = new FormData();
        formData.append('CSYID', CSYID)
        formData.append('file',fileThumbnail)

        try {
            const response = await fetch(`${host}/upload/Thumbnail`, {
                method: 'POST',
                body: formData,
          });
            const responseData = await response.json();
            console.log(responseData);
            if (responseData["success"]){
                withReactContent(Swal).fire({
                    title: "Thumbnail uploaded successfully",
                    icon: "success"
                }).then(ok => {
                    if(ok)
                        window.location.href = "/"
                });
            }else{
                withReactContent(Swal).fire({
                  title: "Error!",
                  icon: "error"
                })
            }
        } catch (error) {
            withReactContent(Swal).fire({
                title: "Please contact admin!",
                text: error,
                icon: "error"
            })
        }
      }
      /* CSV */
      if (index === 1) {
        const fileInput = document.getElementById('inputGroupFile02');
        const fileCSV = fileInput.files[0];
    
        const formData = new FormData();
        formData.append('CSYID', CSYID)
        formData.append('file', fileCSV)
        try {
            const response = await fetch(`${host}/upload/CSV`, {
                method: 'POST',
                body: formData,
            });
            const responseData = await response.json();
            console.log(responseData);
            if (responseData["success"]){
                withReactContent(Swal).fire({
                    title: "CSV uploaded successfully",
                    icon: "success"
                })
            }else{
                withReactContent(Swal).fire({
                  title: "Error!",
                  icon: "error"
                })
            }
        } catch (error) {
            withReactContent(Swal).fire({
                title: "Please contact admin!",
                text: error,
                icon: "error"
            })
        }
    }
    

      if(response){
        setTimestamps(prevTimestamps => {
            const newTimestamps = [...prevTimestamps];
            newTimestamps[index] = formattedTimestamp;
            return newTimestamps;
      })};
  };
        const [showModal, setShowModal] = useState(false);

        const handleShowModal = () => {
            setShowModal(true);
        };

        const handleCloseModal = () => {
            setShowModal(false);
        };

      
        const handleDelete = async () =>{
            const formData = new FormData();
            formData.append('CSYID',CSYID)
  
            try {
                const response = await fetch(`${host}/TA/class/delete`, {
                    method: 'POST',
                    body: formData,
                });
                const responseData = await response.json();
                console.log(responseData);
                if (responseData.Status){
                    withReactContent(Swal).fire({
                        title: "Class Deleted successfully",
                        icon: "success"
                    }).then(ok => {
                        if(ok)
                            window.location.href = "/"
                    });
                }else{
                    withReactContent(Swal).fire({
                      title: "Error!",
                      icon: "error"
                    })
                }
            } catch (error) {
                withReactContent(Swal).fire({
                    title: "Please contact admin!",
                    text: error,
                    icon: "error"
                })
            }
        }


        const handleClassIDChange = (e) => {
            setClassID(e.target.value);
        }
        
        const handleSchoolYearChange = (e) => {
            setSchoolYear(e.target.value);
        }
        
        const handleClassNameChange = (e) => {
            setClassName(e.target.value);
        }

        const savebutcondi1 = classID === classData.ClassID && schoolYear === classData.SchoolYear && className === classData.ClassName;
        const savebutcondi2 = !classID || !schoolYear || !className;
        const isCreateButtonDisabled = savebutcondi1 || savebutcondi2;
        console.log(classData.classid)
        
  return (
    <div>
        <Navbarprof></Navbarprof> 
        <br></br>
        <div className="card" style={{ marginLeft: 10 +'em', marginRight: 10 + 'em' }}>
            <div className="card-header">
                <div className="row" style={{marginBottom:"-5px"}}>
                    <div className="col">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <button className="nav-link active">Class edit</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link link" onClick={() => {sessionStorage.setItem("CSYID", classData.classid);navigate("/TAmanage")}} >TA management</button>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-danger float-end" type="button" style={{marginLeft:"20px"}} onClick={handleShowModal}>Delete</button>
                        <button className="btn btn-primary float-end" type="button" onClick={() => navigate("/")}>Back</button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <h3>Information</h3>
                <br/>
                <div className="row g-3">
                    <div className="col-md-3">
                        <label for="inputID" className="form-label">Class ID*</label>
                        <input type="text" className="form-control" id="inputID" placeholder="ex. 2301233 (7 digits number)" value={classID} onChange={handleClassIDChange} />
                    </div>
                    <div className="col-md-3">
                        <label for="inputYear" className="form-label">School Year/Semester*</label>
                        <input type="text" className="form-control" id="inputYear" placeholder="ex. 2020/1" value={schoolYear} onChange={handleSchoolYearChange}/>
                    </div>
                    <div className="col-6">
                        <label for="inputName" className="form-label">Class Name*</label>
                        <input type="text" className="form-control" id="inputClass" placeholder="Name" value={className} onChange={handleClassNameChange}/>
                    </div>
                </div>
                <div className="row" style={{marginTop: "10px",marginBottom: "20px"}}>
                    <div className="col">
                        <button type="button" className="btn btn-primary float-end" disabled={isCreateButtonDisabled} onClick={handleEditClick}>Save</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h3>Class Picture</h3>
                        <br/>
                        <div className="row">
                            <div className="col-md-3 d-lg-flex justify-content-lg-center">
                                <img src={(classData.Thumbnail && classData.Thumbnail !== "null") ? `${host}/Thumbnail/` + classData.Thumbnail : "https://cdn-icons-png.flaticon.com/512/3643/3643327.png"} style={{ width: '100px', height: '100px', borderRadius: '5px'}}  alt="..."/>
                            </div>
                            <div className="col">
                                <div class="input-group">
                                    <input type="file" class="form-control" id="inputGroupFile01" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col">
                                        {timestamps[0] && <p class="card-text">Last Submitted: <span>{timestamps[0]}</span></p>}
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-primary float-end" type="button" id="inputGroupFileAddon04" onClick={() => handleUpload(0)}>Upload</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <h3>Student List</h3>
                        <br/>
                        <div className="row">
                            <div className="col">
                                <div class="input-group">
                                    <input type="file" class="form-control" id="inputGroupFile02" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col">
                                        {timestamps[1] && <p class="card-text">Last Submitted: <span>{timestamps[1]}</span></p>}
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-primary float-end" type="button" id="inputGroupFileAddon04" onClick={() => handleUpload(1)}>Upload</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div class="card-header">
                <h5>Edit Class</h5> 
            </div>
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-md-3">
                        <label for="inputID" class="form-label">Class ID*</label>
                        <input type="text" class="form-control" id="inputID" placeholder="ex. 2301233 (7 digits number)" value={classID} onChange={handleClassIDChange} />
                    </div>
                    <div class="col-md-3">
                        <label for="inputYear" class="form-label">School Year/Semester*</label>
                        <input type="text" class="form-control" id="inputYear" placeholder="ex. 2020/1" value={schoolYear} onChange={handleSchoolYearChange}/>
                    </div>
                    <div class="col-6">
                        <label for="inputName" class="form-label">Class Name*</label>
                        <input type="text" class="form-control" id="inputClass" placeholder="Name" value={className} onChange={handleClassNameChange}/>
                    </div>
                    <div class="col-6">
                        <label for="formGroupExampleInput2" class="form-label">Class Picture</label>
                        <div class="input-group">
                            <input type="file" class="form-control" id="inputGroupFile01" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                            <button class="btn btn-outline-primary" type="button" id="inputGroupFileAddon04" onClick={() => handleUpload(0)}>Upload</button>
                        </div>
                        {timestamps[0] && <p class="card-text">Last Submitted: <span>{timestamps[0]}</span></p>}
                    </div>
                    <div class="col-6">
                        <label for="formGroupExampleInput2" class="form-label">Student List</label>
                        <div class="input-group">
                            <input type="file" class="form-control" id="inputGroupFile02" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                            <button class="btn btn-outline-primary" type="button" id="inputGroupFileAddon04" onClick={() => handleUpload(1)}>Upload</button>
                        </div>
                        {timestamps[1] && <p class="card-text">Last Submitted: <span>{timestamps[1]}</span></p>}
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button onClick={() => navigate("/", { state: { Email: Email,classid: CSYID} })} type="button" className="btn btn-primary">Back</button>
                        <button type="button" class="btn btn-primary" disabled={isCreateButtonDisabled} onClick={handleEditClick}>Save</button>   
                        <button type="button" class="btn btn-danger" onClick={handleShowModal}>Delete</button>

                    </div>
                </div>
            </div> */}
        </div>
             {/* Modal */}
             <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Remove Class</h5>
                            <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Do you want to delete this class?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                Cancel
                            </button>
                            <button onClick={() =>handleDelete()} type="button" className="btn btn-primary">
                                 Delete
                             </button>
                             
                        </div>
                    </div>
                </div>
            </div>
        
      
    </div>
  )
}


export default ClassEdit
