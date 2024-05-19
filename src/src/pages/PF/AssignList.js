import React, { useState, useEffect } from 'react';
import Navbarprof from '../../components/Navbarprof'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const host = `http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}`

function AssignList() {
  
  // const [expandedLabs, setExpandedLabs] = useState({});
  const navigate = useNavigate();
  const [isCreate, setAssignCreate] = useState(false);
  const [isEdit, setAssignEdit] = useState(false);
  const [ClassInfo, setClassInfo] = useState({});
  
  const [Email,] = useState(sessionStorage.getItem("Email"));
  const [classId,] = useState(sessionStorage.getItem("classId"));

  const [assignmentsData, setAssignmentsData] = useState({
    "Assignment": {}
  });

  // const handleToggleLab = (labIndex) => {
  //   setExpandedLabs((prevExpandedLabs) => ({
  //     ...prevExpandedLabs,
  //     [labIndex]: !prevExpandedLabs[labIndex],
  //   }));
  // };

  useEffect(() => {

    // const fetchUserData = async () => {
    //   try {
    //     const response = await fetch(`${host}/ST/user/profile?Email=${Email}`);
    //     const userdata = await response.json();
    //     console.log('user:', userdata);
    //     setUserData(userdata);
    //     console.log(userdata.ID);
    //     // Call fetchData here after setting userData
    //     fetchData(userdata.ID);
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //   }
    // };
  
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/TA/class/Assign?CSYID=${classId}`);
        const data = await response.json();
        console.log(data);
        setAssignmentsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

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
    try{setAssignCreate(sessionStorage.getItem("statusCreate"))}catch{}
    try{setAssignEdit(sessionStorage.getItem("statusEdit"))}catch{}
    // fetchUserData();
    fetchData()
  }, []);


  return (
    <div>
      <Navbarprof />

      <br></br>
      <div className="media d-flex align-items-center">
        <span style={{ margin: '0 10px' }}></span>
        <img className="mr-3" alt="thumbnail" src={ClassInfo['Thumbnail'] ? `${host}/Thumbnail/` + ClassInfo['Thumbnail'] : "https://cdn-icons-png.flaticon.com/512/3426/3426653.png"} style={{ width: '40px', height: '40px' }} />
        <span style={{ margin: '0 10px' }}></span>
        <div className="card" style={{ width: '30rem', padding: '10px' }}>
          <h5>{ClassInfo['ClassID']} {ClassInfo['ClassName']} {ClassInfo['ClassYear']}</h5>
          <h6>Instructor: {ClassInfo['Instructor']}</h6>
        </div>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/StudentList", { state: { Email: Email,classid:classId} })} style={{ marginLeft: 40 + 'em' }}>Student lists</button>
      </div>

      <br></br>
      {isCreate && (
              <div className="alert alert-success d-flex align-items-center" role="alert">
                Assignment created successfully
              </div>
            )}
      {isEdit && (
              <div className="alert alert-success d-flex align-items-center" role="alert">
                Assignment Edit successfully
              </div>
            )}
      <div className="card" style={{ marginLeft: 10 + 'em', marginRight: 10 + 'em' }}>
        <div className="card-header">
          <h5 style={{ display: 'inline-block' }}>Assignments</h5>
          <span style={{ margin: '0 10px' }}></span>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => navigate("/AssignCreate", { state: { Email: Email,classid:classId} })} >+ New</button>
        </div>
        <div className="card-body" style={{ overflowY: 'scroll' }}>
          <div>
            {Object.keys(assignmentsData.Assignment).map((labNumber, labIndex) => {
              const lab = assignmentsData.Assignment[labNumber];
              // const isLabExpanded = expandedLabs[labIndex];
              return (
                <div key={labIndex} className='card ' style={{ marginBottom: '2rem' }} onClick={() => {sessionStorage.setItem("lab", labNumber);sessionStorage.setItem("labname", lab.LabName); navigate("/AssignEdit")}}>
                  <button  style={{ fontSize: '1.2rem', height:'4rem'}} class="fw-bold ">
                    <span>{`Lab ${labNumber}: ${lab.LabName}`}</span>
                    {Object.keys(lab.Section).length > 0 && (
                      <span style={{ marginLeft: '2rem', fontWeight:'normal'}}>
                        (First Publish: {lab.Section[Object.keys(lab.Section)[0]].Publish} | Last Due: {lab.Section[Object.keys(lab.Section)[Object.keys(lab.Section).length - 1]].Due})
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Link to="/">
                <button type="button" className="btn btn-primary">Back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignList;