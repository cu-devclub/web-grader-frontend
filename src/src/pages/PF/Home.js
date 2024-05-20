import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import React, { useState, useEffect } from 'react';
import Navbarprof from '../../components/Navbarprof'
import { useNavigate } from 'react-router-dom';
import { Gear, ChevronDown, ChevronRight } from 'react-bootstrap-icons';
// import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const host = `http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}`

function HomePF() {
  const navigate = useNavigate();

  const [Email,] = useState(Cookies.get('email'));
  const [courses, setCourses] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [ready, setReady] = useState(null);
  const [expandedYear, setExpandedYear] = useState(null);
  
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [formData, setFormData] = useState({
    Creator: '',
    ClassName: '',
    ClassID: '',
    SchoolYear: ''
  });

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${host}/TA/class/classes?Email=${Email}`);
      const data = await response.json();
      console.log('class:', data);
      const sortedCourses = Object.fromEntries(Object.entries(data).sort((a, b) => b[0].localeCompare(a[0])));
  
      setCourses(sortedCourses);
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };
  
  

  useEffect(() => {
    fetchCourses();
    setReady(true);
  }, []);
  

  const toggleYear = (year) => {
    if (expandedYear === year) {
      setExpandedYear(null);
    } else {
      setExpandedYear(year);
    }
  };
  
  const handleToggleExpand = () => {
    setExpanded(!expanded);
    setFormData({
      Creator: Email,
      ClassName: '',
      ClassID: '',
      SchoolYear: ''
    });
  };

  const handleCancel = () => {
    setFormData({
      Creator:'',
      ClassName: '',
      ClassID: '',
      SchoolYear: ''
    });
    setExpanded(false);
  };
  
  const handleCreateClick = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await fetch(`${host}/TA/class/create`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const responseData = await response.json();
      console.log(response)
      if (responseData.Status) {
        fetchCourses();
        handleCancel()
        withReactContent(Swal).fire({
            title: "Class created successfully",
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
  };

  return (
    <div>
      <Navbarprof />
      <br />
      <div className="d-flex align-items-center">
        <h5 className="me-2" style={{marginLeft:'10px'}}>Course</h5>
        {!expanded ? (<button  onClick={handleToggleExpand} className="btn btn-outline-secondary" type="button" id="button-addon2">+ New</button>) : null }
      </div>
      {!expanded ? (null) : ( 
          <div className="container d-flex justify-content-center">
            <div className="card" style={{ width: '800px' }}>
              <div className="card-header">
                <h4>Create Class</h4>
              </div>
              <div className="card-body">
                <form className="row g-3">
                  <div className="col-md-3">
                    <label htmlFor="inputID" className="form-label">Class ID</label>
                    <input type="text" name="ClassID" className="form-control" id="inputID" placeholder="e.g., 2301240"  onChange={handleChange} />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputYear" className="form-label">Academic year/Semester</label>
                    <input type="text" name="SchoolYear" className="form-control" id="inputYear" placeholder="e.g., 2021/2" onChange={handleChange} />
                  </div>
                  <div className="col-6">
                    <label htmlFor="inputName" className="form-label">Class Name</label>
                    <input type="text" name="ClassName" className="form-control" id="inputClass" placeholder="e.g., Introduction to Computer Science" onChange={handleChange} />
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                    <div>
                      <button type="button" className="btn btn-primary" onClick={handleCreateClick}>Create</button>
                      <br />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          )}


      {courses && ready ? (
        <main>
          <div>
            <br></br>
            {/* วนลูปเพื่อแสดง container แยกตามปีการศึกษา */}
            {Object.entries(courses).map(([year, classes]) => (
              <div key={year} className="container-lg mb-3 bg-light" style={{ padding: '10px' }}>
                <h5 className='unselectable' onClick={() => toggleYear(year)} style={{ cursor: 'pointer' }}>
                  {expandedYear === year ? <ChevronDown /> : <ChevronRight />} {year}
                </h5>
                {expandedYear === year && (
                  <div className="row row-cols-1 row-cols-md-5 g-2">
                    {/* วนลูปเพื่อแสดงข้อมูลคอร์สในแต่ละปีการศึกษา */}
                    {classes.map(course => (
                      <div className="card" style={{width: '200px'}}>
                        <img className="card-img-top w-100 d-block" src={course.Thumbnail ? `${host}/Thumbnail/` + course.Thumbnail : "https://cdn-icons-png.flaticon.com/512/3643/3643327.png"} style={{ width: '190px', height: '190px', paddingTop: '5px', borderRadius: '5px'}}  alt="..."/>
                        {/* <img class="" style="width: 198px;height: 198px;"/> */}
                        <div className="card-body">
                          <h4 className="card-title">{course.ClassName}</h4>
                          <p className="card-text">ID: {course.ClassID}</p>
                          <button className="btn btn-primary" type="button" onClick={() => {sessionStorage.setItem("classId", course.ID);  sessionStorage.setItem("Email", Email);  navigate("/AssignList");}}>
                            View course
                          </button>
                          <button className="btn btn-warning float-end" type="button" onClick={() => {sessionStorage.setItem("Thumbnail", course.Thumbnail);sessionStorage.setItem("classid", course.ID);sessionStorage.setItem("ClassID", course.ClassID);sessionStorage.setItem("SchoolYear", year);sessionStorage.setItem("ClassName", course.ClassName);navigate("/ClassEdit")}}>
                            <Gear />
                          </button>
                        </div>
                      </div>


                      // <div key={course.ID} className="col">
                      //   <div className="card h-100" style={{width: '15rem'}}><div>
                          
                      //     <img src={course.Thumbnail ? `${host}/Thumbnail/` + course.Thumbnail : "https://cdn-icons-png.flaticon.com/512/3643/3643327.png"} className="card-img-top" style={{ padding:'15px',width: '100%', height: '100%'}}  alt="..."/>

                      //     </div>
                      //     <div className="card-body" style={{ overflowY: 'scroll' }}>
                      //       <h5 className="card-title">{course.ClassName}</h5>
                      //       <p className="card-text">{course.ClassID}</p>
                      //       <button onClick={() => {sessionStorage.setItem("classId", course.ID);  sessionStorage.setItem("Email", Email);  navigate("/AssignList");}} className="btn btn-primary">View course</button>
                      //     </div>
                      //     <div class="card-footer">
                      //       <div style={{textDecoration: 'underline',color: 'blue',cursor: 'pointer',}} onClick={() => navigate("/ClassEdit", { state: { Email: Email,classid: course.ID, ClassID:course.ClassID, SchoolYear:year, ClassName:course.ClassName} })}>Edit</div>
                      //     </div>
                      //   </div>
                      // </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      ) : (
        "")}

    </div>
  )
}

export default HomePF
