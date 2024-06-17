import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const host = `http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}`

function Lab() {
  const navigate = useNavigate();

  // const [assignmentData, setAssignmentData] = useState(null);
  // const [fileSelectedMap, setFileSelectedMap] = useState({}); // Map to track file selection for each question
  // const [submissionResponses, setSubmissionResponses] = useState({}); // Map to hold submission responses for each question

  const [ClassInfo, setClassInfo] = useState({})

  const [Email,] = useState(Cookies.get('email'));
  const [LID,] = useState(sessionStorage.getItem("LID"))
  const [classId,] = useState(sessionStorage.getItem("classId"))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/ST/assignment/specific?LID=${LID}&email=${Email}`);
        const data = await response.json();
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Class card info
    const fetchClass = async () => {
      try {
        const response = await fetch(`${host}/TA/class/class?CSYID=${classId}`);
        const data = await response.json();
        setClassInfo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchClass();
  }, [LID, classId, Email]);

  // function generateBadge(status) {
  //   if (status){
  //     return (
  //         <h5>
  //             <span className={`badge bg-danger`}>
  //                 Late
  //             </span>
  //         </h5>
  //     );}
  // }

  // const handleFileChange = (event, questionKey) => {
  //   // Update fileSelectedMap for the specific question with the file selection status
  //   setFileSelectedMap((prevMap) => ({
  //     ...prevMap,
  //     [questionKey]: event.target.files.length > 0,
  //   }));
  // };

  // const handleSubmit = async (event, questionKey) => {
  //   event.preventDefault();
  
  //   const formData = new FormData();
  //   formData.append('file', event.target.file.files[0]);
  //   formData.append('UID',userData.ID)
  //   formData.append('CSYID',csyid)
  //   formData.append('Lab',speclab)
  //   formData.append('Question',questionKey.slice(1))
  
  //   try {
  //     const response = await fetch(`${host}/upload/SMT`, {
  //       method: 'POST',
  //       body: formData,
  //     });
  //     const responseData = await response.json();
  //     console.log(responseData);
  //     // Update the submission response state for the specific question
  //     setSubmissionResponses((prevResponses) => ({
  //       ...prevResponses,
  //       [questionKey]:responseData,
  //     }));
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  //     // Update the submission response state for the specific question if there's an error
  //     setSubmissionResponses((prevResponses) => ({
  //       ...prevResponses,
  //       [questionKey]: 'An error occurred while uploading the file.',
  //     }));
  //   }
  // };
  

  return (
    <div>
      <Navbar />
      <br />
      <div className="media d-flex align-items-center">
      <span style={{ margin: '0 10px' }}></span>
        <img className="mr-3" alt="thumbnail" src={ClassInfo['Thumbnail'] ? `${host}/Thumbnail/` + ClassInfo['Thumbnail'] : "https://cdn-icons-png.flaticon.com/512/3426/3426653.png"} style={{ width: '40px', height: '40px' }} />
        <span style={{ margin: '0 10px' }}></span>
        <div className="card" style={{ width: '30rem', padding: '10px' }}>
          <h5>{ClassInfo['ClassID']} {ClassInfo['ClassName']} {ClassInfo['ClassYear']}</h5>
          <h6>Instructor: {ClassInfo['Instructor']}</h6>
        </div>
      </div>
      <br />

      <div className="card" style={{ marginLeft: '10em', marginRight: '10em' }}>
        <div className="card-header">
          <div className="row" style={{marginBottom:"-5px"}}>
            <div className="col">
              <h5>Assignment</h5>
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-primary float-end" onClick={() => navigate("/Class")}>Back</button>
            </div>
          </div>
        </div>
        <div className="card-body">

        </div>
      </div>

      
      {/* <div className="container-lg p-3 mb-2 bg-light">
        <div className="row">
          <div className="col-sm-4">
            <div className="card border-primary mb-3 " style={{ padding: '10px', marginLeft: '2rem' }}>
              <div className="card-body">
                <h5 className="card-title">{assignmentData?.Lab}: {assignmentData?.Name}</h5>
                <p className="card-text">Due Date: {new Date(assignmentData?.Due).toLocaleString()}</p>
                <ul>
                    {assignmentData?.Files.map((file, index) => (
                        <li key={index}><a href={file} target="_blank">{file}</a></li>
                    ))}
                </ul>
              </div>
            </div>
            <br />
            <button className="btn btn-primary" style={{ marginLeft: '5em' }} onClick={() => navigate("/", { state: { Email: Email,classid: csyid } })}>Back</button>
          </div>
          <div className="col">
            {assignmentData?.Questions && Object.keys(assignmentData.Questions).map((questionKey, index) => {
              const question = assignmentData.Questions[questionKey];
              return (
                <div key={questionKey} className="row" style={{ marginBottom: '2rem' }}>
                  <div className="col-sm-10">
                    <div className="card">
                      <div className="card-body row">
                        <h5 className="card-title col-sm-4">Question {question.QuestionNum}</h5>
                        <p className="card-text col-sm-6" style={{ textAlign: 'right' }}>{submissionResponses[questionKey].message}</p>
                        <span className="col-sm-2">{generateBadge(question.Late)}</span>

                        <form 
                          action={`${host}/upload`} 
                          method="POST" 
                          encType="multipart/form-data" 
                          className="row"
                          onSubmit={(event) => handleSubmit(event, questionKey)}
                        >
                          <div className="input-group mb-3">
                            <input 
                              type="file" 
                              name="file" 
                              className="form-control" 
                              onChange={(event) => handleFileChange(event, questionKey)} // Pass questionKey to handleFileChange
                            />
                          </div>
                          
                          <p className="card-text col-sm-9">Last submission: {submissionResponses[questionKey].FileName||question.Submission.FileName}</p>
                          <div className="col-sm-10" style={{ display: 'inline' }}>
                            <div className="row">
                              <p className="card-text col-sm-9">At: {submissionResponses[questionKey].At ? new Date(submissionResponses[questionKey].At).toLocaleString():question.Submission.Date ? new Date(question.Submission.Date).toLocaleString():""}</p>
                              <p className="card-text col-sm-3">Score: {submissionResponses[questionKey].Score||question.Score || '-'}/{question.MaxScore}</p>
                            </div>
                          </div>
              
                          <div className="col-sm-2" style={{ display: 'inline' }}>
                            <input 
                              type="submit" 
                              className="btn btn-primary" 
                              style={{ textAlign: 'right' }} 
                              disabled={!fileSelectedMap[questionKey]} // Disable the button if no file is selected for the specific question
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Lab;
