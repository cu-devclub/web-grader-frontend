import React, { useState, useEffect } from 'react';
import Navbarprof from '../../components/Navbarprof';
import { useNavigate } from 'react-router-dom';

const host = `http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}`

function StudentList() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [maxTotal, setMaxTotal] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showname, setshowname] = useState([])
  
  const [sections, setSections] = useState([]); //ใส่ sec ที่จะเอา
  const [students, setStudents] = useState([]);
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

    fetchClass();
    fetchSection();
    // fetchData();
    fetchUserData();
    fetchName();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(`${host}/TA/Student/List/score?CSYID=${classId}`);
  //     const data = await response.json();
  //     console.log(data)
  //     setStudents(data.transformed_data);
  //     setMaxTotal(data.TotalMax);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     // Display an error message to the user
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchSection = async () => {
    try {
      const response = await fetch(`${host}/section?CSYID=${classId}`);
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${host}/ST/user/profile?Email=${Email}`);
      const userdata = await response.json();
      setUserData(userdata);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Display an error message to the user
    }
  };

  const fetchName = async () => {
    try {
      const response = await fetch(`${host}/TA/Student/List?CSYID=${classId}`);
      const dataname = await response.json();
      setshowname(dataname["data"]["Students"]);
      setMaxTotal(dataname["data"]["MaxScore"])
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Display an error message to the user
    }
  };

  const handleExport = async () => {
    try {
      const formData = new FormData();
      formData.append('CSV_data', JSON.stringify({
        CSV_data: showname, // Convert CSV_data to JSON string
        MaxTotal: maxTotal,
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
                      <th scope="col" className="col-1 text-center">Score</th>
                  </tr>
              </thead>
              <tbody>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            showname.length !== 0 ? (
              showname.filter(element => {
                if((element["UID"] + element["Name"]).toLowerCase().includes(searchQuery.toLowerCase()) && (checkedSections.length === 0 || checkedSections.includes(element["Section"])))
                  return element;
              }).map((element, index) => (
                  <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{element["UID"]}</td>
                      <td>{element["Name"]}</td>
                      <td className='text-center'>{element["Section"]}</td>
                      <td className='text-center'>{element["Score"]}/{maxTotal}</td>
                  </tr>
              ))
          ) : (
          <tr>
              <th scope="row"></th>
              <td>No data</td>
              <td></td>
          </tr>
          )















            // <ol className="list-group list-group-numbered">
            //   {showname.filter(element => {
            //     if((element.UID + element.Name).toLowerCase().includes(searchQuery.toLowerCase()))
            //       return element;
            //   }).map((student, index) => (
            //     <div key={index} className="list-group-item d-flex">
            //       <div>
            //         <span style={{marginLeft:'1rem'}} className="fw-bold">Section:</span> {student.Section} | <span className="fw-bold">UID:</span> {student.UID} | <span className="fw-bold">Name:</span> {student.Name}
            //       </div>
            //     </div>
            //   ))}

            // </ol>


              




















          )}
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