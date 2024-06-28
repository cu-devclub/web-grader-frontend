import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

const host = `http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}`

function StudentList() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showname, setshowname] = useState([])
  
  const [sections, setSections] = useState([]); //ใส่ sec ที่จะเอา]
  const [checkedSections, setCheckedSections] = useState([])

  const [ClassInfo, setClassInfo] = useState({});

  
  const [Email,] = useState(sessionStorage.getItem("Email"));
  const [classId,] = useState(sessionStorage.getItem("classId"));

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await fetch(`${host}/TA/class/class?CSYID=${classId}`);
        const data = await response.json();
        console.log(data);
        // setAssignmentsData(data);
        setClassInfo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchSection = async () => {
      try {
        const response = await fetch(`${host}/section?CSYID=${classId}`);
        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    const fetchName = async () => {
      try {
        const response = await fetch(`${host}/TA/Student/List?CSYID=${classId}`);
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

  // const filteredStudents = students.filter(student => {
  //   const { UID, Name } = student;
  //   return UID.includes(searchQuery) || Name.toLowerCase().includes(searchQuery.toLowerCase());
  // });

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
        <button type="button" className="btn btn-secondary" style={{ marginLeft: '40em' }} onClick={handleExport}>Export</button>
      </div>
      <br />
      <div className="card" style={{ marginLeft: '10em', marginRight: '10em', maxHeight: "70vh"}}>
        <div className="card-header">
          <h5>Student Name List</h5>
        </div>
        <div className="card-body" style={{ overflowY: 'scroll' }}>
          {/* Search input */}
          <form className="d-flex">
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
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" className="btn btn-primary" onClick={() => navigate("/AssignList", { state: { Email, classid: classId } })}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;