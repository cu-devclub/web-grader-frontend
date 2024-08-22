import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// import {PencilSquare} from 'react-bootstrap-icons'

const host = `${process.env.REACT_APP_HOST}`

function StudentList() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showname, setshowname] = useState([])
  
  const [sections, setSections] = useState([]);
  const [checkedSections, setCheckedSections] = useState([])

  const [ClassInfo, setClassInfo] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [gonEdit, setGonEdit] = useState("");

  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [section, setSection] = useState("");

  // const [Email,] = useState(sessionStorage.getItem("Email"));
  const [classId,] = useState(sessionStorage.getItem("classId"));

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await fetch(`${host}/TA/class/class?CSYID=${classId}`, {
          method: "GET",
          credentials: "include",
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
              "X-CSRF-TOKEN": Cookies.get("csrf_token")
          }
        });
        const data = await response.json();
        setClassInfo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchSection = async () => {
      try {
        const response = await fetch(`${host}/TA/class/classes/section?CSYID=${classId}`, {
          method: "GET",
          credentials: "include",
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
              "X-CSRF-TOKEN": Cookies.get("csrf_token")
          }
        });
        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    const fetchName = async () => {
      try {
        const response = await fetch(`${host}/TA/Student/List?CSYID=${classId}`, {
          method: "GET",
          credentials: "include",
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
              "X-CSRF-TOKEN": Cookies.get("csrf_token")
          }
        });
        const dataname = await response.json();
        setshowname(dataname["data"]["Students"]);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Display an error message to the user
      }
    };

    fetchClass();
    fetchSection();
    fetchName();
  }, [classId]);

  const handleExport = async () => {
    try {
      const formData = new FormData();
      formData.append('CSV_data', JSON.stringify({
        CSV_data: showname, // Convert CSV_data to JSON string
        CSYID: classId
    }),);

      const response = await fetch(`${host}/TA/Student/List/CSV`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "X-CSRF-TOKEN": Cookies.get("csrf_token")
        },
            body: formData
      })
      const data = await response.json();
      
      const url = window.URL.createObjectURL(new Blob([data["data"]["csv"]], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', data["data"]["filename"]);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting data:', error);
      // Display an error message to the user
    }
  };
  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    if(checkedSections.includes(e)){
      setCheckedSections(checkedSections.filter((item) => item !== e))
    }else{
      setCheckedSections([...checkedSections, e])
    }
  }

  const handleEditStudent = async (toEdit) => {
      console.log(toEdit)
      setIsEdit(true);
      setID(toEdit["ID"]);
      setName(toEdit["Name (English)"]);
      setSection(toEdit["Section"]);
      setGroup(toEdit["Group"]);
      console.log(toEdit["ID"]);
      setShowModal(true);
      document.getElementById("SID").disabled = true;
      
  }

  const handleChangeGonEdit = async (k, v) => {
    var x = gonEdit
    x[k] = v
    console.log(x)
    setGonEdit(x)
  }

  const handleAddStudent = async () => {
      setShowModal(true);
      setIsEdit(false);
      document.getElementById("SID").disabled = false
      setID("");
      setName("");
      setGroup("");
      setSection("");
  }

  const UpdateStudent = async () => {

  }

  const RemoveStudent = async () => {
    
  }

  const AddStudent = async () => {
    
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
      <div className="card" style={{ marginLeft: '10em', marginRight: '10em', maxHeight: "70vh"}}>
        <div className="card-header">
          {/* <div className="row" style={{marginBottom:"-5px"}}>
            <div className='col'>
              <h5>Student Name List</h5>
            </div>
            <div className='col-md-2'>
              <button type="button" className="btn btn-primary float-end" onClick={() => navigate("/AssignList")}>Back</button>
            </div>
          </div> */}
          <div className="row" style={{marginBottom:"-5px"}}>
            <div className="col">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button className="nav-link link" onClick={() => navigate("/AssignList")}>Assignments</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link active">Student List</button>
                </li>
                {/* <button style={{marginLeft: "1.5rem"}} className="btn btn-outline-success" type="button" id="button-addon2" onClick={() => handleAddStudent()} >+ Add</button> */}
              </ul>
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary float-end" type="button" style={{marginLeft:"20px"}} onClick={() => navigate("/")}>Back</button>
              <button className="btn btn-secondary float-end" type="button" style={{ marginLeft: '20px' }} onClick={handleExport}>Export</button>
            </div>
          </div>
        </div>
        <div className="card-body" style={{ overflowY: 'scroll' }}>
          {/* Search input */}
          <form className="d-flex" style={{marginBottom: "8px"}}>
            <input className="form-control me-2" type="search" placeholder="Search ID or Name" aria-label="Search" onChange={handleSearch} />
          </form>
          <b>Section: </b>
          {sections.map((section) => (
            <div key={section} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={`inlineCheckbox${section}`}
                checked={checkedSections.includes(section)}
                onChange={() => handleCheckboxChange(section)}
              />
              <label className="form-check-label" htmlFor={`inlineCheckbox${section}`}>
                {section}
              </label>
            </div>
          ))}
          <br />
          <br />
          {/* Loading indicator */}
          <div className='fixed_header'>
          <table className="table">
              <thead>
                  <tr>
                      <th scope="col" className="col-1">#</th>
                      <th scope="col" className="col-2">Student ID</th>
                      <th scope="col">Name</th>
                      <th scope="col" className="col-1 text-center">Section</th>
                      <th scope="col" className="col-1 text-center">Group</th>
                      <th scope="col" className="col-1 text-center">Score</th>
                      {/* <th scope="col" className="col-1 text-center">Edit</th> */}
                  </tr>
              </thead>
              <tbody>
          {showname.length !== 0 ? (
              showname.filter(element => {
                if((element["ID"] + element["Name (English)"]).toLowerCase().includes(searchQuery.toLowerCase()) && (checkedSections.length === 0 || checkedSections.includes(element["Section"])))
                  return element;
                return false
              }).map((element, index) => (
                  <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{element["ID"]}</td>
                      <td>{element["Name (English)"]}</td>
                      <td className='text-center'>{element["Section"]}</td>
                      <td className='text-center'>{element["Group"]}</td>
                      <td className='text-center'>{element["Score"]}/{element["MaxScore"]}</td>
                      {/* <td className='text-center'><button type="button" className="btn btn-warning" onClick={() => {handleEditStudent(element)}}><PencilSquare/></button></td> */}
                  </tr>
              ))
            ) : (
            <tr>
                <th scope="row"></th>
                <td>No data</td>
                <td></td>
            </tr>
            )
          }
            </tbody>
          </table>
          </div>
          <br />
        </div>
      </div>
      <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"> {isEdit ? "Edit" : "Add"}  </h5>
              <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="studentId">Student ID</label>
                        <input type="text" className="form-control" id="SID" placeholder="Student ID" value={ID} onChange={(e) => {setID(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Name</label>
                      <input type="text" className="form-control" id="nameEdit" placeholder="Enter name" value={name} onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Section</label>
                      <input type="text" className="form-control" id="sectionEdit" placeholder="Enter section" value={section} onChange={(e) => {setSection(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Group</label>
                      <input type="text" className="form-control" id="groupEdit" placeholder="Enter group" value={group} onChange={(e) => {setGroup(e.target.value)}}/>
                    </div>
                  </form>
              
            </div>
            <div className="modal-footer" style={{justifyContent: "flex-start"}}>
              <button type="button" className="btn btn-outline-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              {isEdit ? (
                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>
                  Remove
                </button>
              ):(
                ""
              )}
              <button type="button" className="btn btn-success" onClick={handleCloseModal}>
                  Save
              </button>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;