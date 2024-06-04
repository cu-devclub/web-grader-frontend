import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import React, { useState, useEffect } from 'react';
import Navbarprof from '../../components/Navbarprof'
import { useNavigate } from 'react-router-dom';

const host = `http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}`

function AssignEdit() {
  const navigate = useNavigate();
  // User Data
  const [ClassInfo, setClassInfo] = useState({});
  const [classId,] = useState(sessionStorage.getItem("classId"));
  const [LID,] = useState(sessionStorage.getItem("LID"));

  // Normal field
  const [labNum, setLabNum] = useState('');
  const [labName, setLabName] = useState('');
  const [publishDate, setPublishDate] = useState('')
  const [dueDate, setDueDate] = useState('')

  // Question Sys
  const [totalQNum, setTotalQNum] = useState(1);
  const [Question, setScores] = useState([{id: 1, score: 1}]);

  // Group/Section Sys
  const [isGroup, setIsGroup] = useState(false)
  const [SelectList, setSelectList] = useState([]);
  const [Selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchLab = async () => {
      try {
        const response = await fetch(`${host}/TA/class/Assign/data?LID=${LID}`);
        const data = await response.json();
        if(data.success){
          setLabNum(data.data.LabNum)
          setLabName(data.data.LabName)
  
          setPublishDate(data.data.PubDate)
          setDueDate(data.data.DueDate)
  
          setIsGroup(data.data.IsGroup)
          setSelectList(data.data.SelectList)
          setSelected(data.data.Selected)
  
          setTotalQNum(data.data.Question.length)
          setScores(data.data.Question)
        }else{
          throw Error(data.msg)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchClass = async () => {
      try {
        const response = await fetch(`${host}/TA/class/class?CSYID=${classId}`);
        const data = await response.json();
        // setAssignmentsData(data);
        setClassInfo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchClass()
    fetchLab()
  }, [classId, LID]);

  const handlePublishDateChange = (e) => {
    setPublishDate(e.target.value)
  }

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value)
  }

  const handleCheckboxChange = (e) => {
    if(Selected.includes(e)){
      setSelected(Selected.filter((item) => item !== e));
    }else{
      setSelected([...Selected, e]);
    }
  };

  const handleTotalQNumChange = (e) => {
    const numQuestions = parseInt(e.target.value, 10);
    setTotalQNum(numQuestions);

    const newScores = Array.from({ length: numQuestions }, (_, index) => ({
      id: index + 1,
      score: 1,
    }));
    setScores(newScores);
  };

  const handleScoreChange = (id, score) => {
    const updatedScores = Question.map((item) =>
      item.id === id ? { ...item, score } : item
    );
    setScores(updatedScores);
  };

  const handleButtonClick = async () => {
    if(!isFormValid()){
      withReactContent(Swal).fire({
        title: "Please fill required field in form",
        icon: "warning"
      })
      return;
    }

    const formData = new FormData()
    const addFiles = await document.getElementById('inputlink').files
    for(let i=0;i<addFiles.length;i++){
      formData.append(`Add${i}`, addFiles[i])
    }

    for(let i = 0;i < Question.length;i++){
      formData.append(`Source${i}`, document.getElementById(`QSource${Question[i].id}`).files[0])
      formData.append(`Release${i}`, document.getElementById(`QRelease${Question[i].id}`).files[0])
    }
    
    formData.append('LID', LID);
    formData.append('LabNum', labNum);
    formData.append('LabName', labName);
    
    formData.append("PubDate", publishDate);
    formData.append("DueDate", dueDate);

    formData.append('CSYID', classId);

    formData.append("IsGroup", isGroup);
    formData.append("Selected", Selected);

    formData.append("QNum", totalQNum);
    formData.append("Question", JSON.stringify(Question))

    

    try {
      const response = await fetch(`${host}/TA/class/Assign/Edit`, {
        method: 'POST',
        body: formData,
      })
      const Data = await response.json()

      if (Data.success){
        withReactContent(Swal).fire({
            title: "Assignment edited successfully",
            icon: "success"
        }).then(ok => {
            if(ok)
                window.location.href = "/AssignList"
        });
    }else{
        withReactContent(Swal).fire({
          title: Data.msg,
          icon: Data.data
        })
    }
    }catch (error) {
      withReactContent(Swal).fire({
          title: "Please contact admin!",
          text: error,
          icon: "error"
      })
    }
  };

  const isFormValid = () => {
    return (
      true &&
      labNum !== '' &&
      labName !== '' &&
      dueDate !== '' &&
      new Date(publishDate) <= new Date(dueDate)
      // isAllQHaveFile()
      // checkedSections !== null &&
      // checkedSections !== undefined &&
      // checkedSections.length > 0 &&
      // checkedSections.every(section => 
      //   submittedDates[section] && 
      //   submittedDates[section].publishDate && 
      //   submittedDates[section].dueDate &&
      //   new Date(submittedDates[section].publishDate) <= new Date(submittedDates[section].dueDate)
      // )
    );
  };

  return (
    <div>
      <Navbarprof />
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
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                      <button className="nav-link active">Edit</button>
                  </li>
                  <li className="nav-item">
                      <button className="nav-link link" onClick={() => navigate("/Sentin")} >Sent in</button>
                  </li>
                </ul>
              </div>
              <div className="col-md-2">
                <button type="button" className="btn btn-primary float-end" style={{marginLeft:"20px"}} id="liveToastBtn" onClick={handleButtonClick}>Save</button>
                <button type="button" className="btn btn-primary float-end" onClick={() => navigate("/AssignList")}>Back</button>
              </div>
            </div>
          </div>
          <div className="card-body">
          <form className="row g-3">
            <div className="row" style={{marginBottom: "1rem", marginTop: "1rem"}}>
              <div className="col">
                <div className="row">
                  <div className="col">
                    <label htmlFor="LabNum" className="form-label">Lab Number*</label>
                    <input type="number" min="1" className="form-control" id="LabNum" value={labNum} onChange={(e) => setLabNum(e.target.value)} />
                  </div>
                  <div className="col">
                    <label htmlFor="LabName" className="form-label">Lab Name*</label>
                    <input type="name" className="form-control" id="LabName" value={labName} onChange={(e) => setLabName(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="col">
                <label htmlFor="inputlink" className="form-label">Additional Files</label>
                <input type="file" className="form-control" id="inputlink" placeholder="Select file" multiple/>
              </div>
            </div>
            <div className="row" style={{marginBottom: "1rem"}}>
              <div className="col">
                <div className='row'>
                <div className="col-md-6">
                  <label htmlFor={`PublishDate`} className="form-label">Publish Date*</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id={`publishdate`}
                    value={publishDate}
                    onChange={handlePublishDateChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor={`DueDate`} className="form-label">Due Date*</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id={`duedate`}
                    value={dueDate}
                    onChange={handleDueDateChange}
                    min={publishDate}
                  />
                </div>
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputQnum" className="form-label">Total Question Number*</label>
                <input type="number" min="1" className="form-control" id="inputQnum" value={totalQNum} onChange={handleTotalQNumChange} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className='card-header'>
                    {(!isGroup) ? "Section" : "Group"}*
                  </div>
                  <div className='card-body'>
                    {SelectList.map((element) => (
                    <div key={element} className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`inlineCheckbox${element}`}
                        value={element}
                        checked={Selected.includes(element)}
                        onChange={() => handleCheckboxChange(element)}
                      />
                      <label className="form-check-label" htmlFor={`inlineCheckbox${element}`}>
                        {element}
                      </label>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
              <div className='col'>
                <div className="card">
                  <div className='card-header'>
                    Questions*
                  </div>
                  <div className='card-body'>
                    {Question.map((scoreItem) => (
                      <div key={scoreItem.id} className="col" style={{marginBottom: "1rem"}}>
                        <b>Question {scoreItem.id}</b>
                        <br />
                        <label htmlFor={`QScore${scoreItem.id}`} className="form-label">Score</label>
                        <input 
                          id={`QScore${scoreItem.id}`}
                          type="number"
                          min="1"
                          className="form-control"
                          value={scoreItem.score}
                          onChange={(e) => handleScoreChange(scoreItem.id, e.target.value)}
                        />
                        <label htmlFor={`QSource${scoreItem.id}`} className="form-label">ipynb source*</label>
                        <input type="file" id={`QSource${scoreItem.id}`} className="form-control" accept=".ipynb"/> 
                        <label htmlFor={`QRelease${scoreItem.id}`} className="form-label">ipynb release*</label>
                        <input type="file" id={`QRelease${scoreItem.id}`} className="form-control" accept=".ipynb"/> 
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <br></br>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AssignEdit;