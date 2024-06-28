import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom';

const host = `http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}`

function AssignList() {
  
  // const [expandedLabs, setExpandedLabs] = useState({});
  const navigate = useNavigate();
  const [ClassInfo, setClassInfo] = useState({});
  
  const [Email,] = useState(sessionStorage.getItem("Email"));
  const [classId,] = useState(sessionStorage.getItem("classId"));

  const [assignmentsData, setAssignmentsData] = useState([]);

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
        setAssignmentsData(data.data.Assignment);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchClass = async () => {
      try {
        const response = await fetch(`${host}/TA/class/class?CSYID=${classId}`);
        const data = await response.json();
        setClassInfo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchClass();
    // fetchUserData();
    fetchData()
  }, [classId]);


  return (
    <div>
      <Navbar />

      <br></br>
      {ClassInfo && (
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
      )}

      <br></br>
      <div className="card" style={{ marginLeft: 10 + 'em', marginRight: 10 + 'em' }}>
        {/* <div className="card-header">
          <h5 style={{ display: 'inline-block' }}>Assignments</h5>
          <span style={{ margin: '0 10px' }}></span>
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => navigate("/AssignCreate", { state: { Email: Email,classid:classId} })} >+ New</button>
        </div> */}
        <div className="card-header">
          <div className="row" style={{marginBottom:"-5px"}}>
              <div className="col">
                <h5 style={{ display: 'inline-block' }}>Assignments</h5>
                <span style={{ margin: '0 10px' }}></span>
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => navigate("/AssignCreate", { state: { Email: Email,classid:classId} })} >+ New</button>
              </div>
              <div className="col-md-1">
                <button type="button" onClick={() => navigate("/")} className="btn btn-primary float-end">Back</button>
              </div>
          </div>
        </div>
        <div className="card-body" style={{ overflowY: 'scroll' }}>
          <div>
            {assignmentsData && ((assignmentsData.length !== 0) && (
              assignmentsData.map(assign => {
                return (
                <div key={assign["LID"]} className='card' style={{ marginBottom: '2rem' }} onClick={() => {sessionStorage.setItem("LID", assign["LID"]); navigate("/AssignEdit")}}>
                  <button style={{ fontSize: '1.2rem', height:'4rem'}} className="fw-bold ">
                    <div className='row'>
                      <div className='col-2' style={{textAlign: 'Left'}}>
                        <span style={{marginLeft: '2rem'}}>{`Lab ${assign["Lab"]}`}</span>
                      </div>
                      <div className='col' style={{textAlign: 'Left'}}>
                        <span>{`${assign["Name"]}`}</span>
                      </div>
                      <div className='col-3'>
                      <span style={{fontWeight:'normal', fontSize: '0.9rem'}}>
                          {`Publish:`}
                        </span>
                        <span style={{fontWeight:'normal'}}>
                          {` ${assign["Publish"]}`}
                        </span>
                      </div>
                      <div className='col-3'>
                        <span style={{fontWeight:'normal', fontSize: '0.9rem'}}>
                          {`Due:`}
                        </span>
                        <span style={{fontWeight:'normal'}}>
                          {` ${assign["Due"]}`}
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
                )
              })
            ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignList;