import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar.js';
import { useNavigate } from 'react-router-dom';
import { Gear, ChevronDown, ChevronRight } from 'react-bootstrap-icons';
import Cookies from 'js-cookie';

const host = `http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}`


function HomeST() {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState(null);
  const [classes, setClasses] = useState(null);
  const [expandedYear, setExpandedYear] = useState(null);
  const [ready, setReady] = useState(null);

  const [Email,] = useState(Cookies.get('email'));

  useEffect(() => {
    setUserData({ID: Cookies.get("uid")})

    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`${host}/ST/user/profile?Email=${Email}`);
        const userData = await userResponse.json();
        setUserData(userData);
  
        // Fetch class data if user data is available
        if (userData) {
          const classResponse = await fetch(`${host}/ST/class/classes?UID=${userData.ID}`);
          const classData = await classResponse.json();
          const sortedCourses = Object.fromEntries(Object.entries(classData).sort((a, b) => b[0].localeCompare(a[0])));
          setClasses(sortedCourses);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch(`${host}/TA/class/classes?Email=${Email}`);
        const data = await response.json();
        const sortedCourses = Object.fromEntries(Object.entries(data).sort((a, b) => b[0].localeCompare(a[0])));
    
        setCourses(sortedCourses);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };

    fetchData()
    fetchCourses()
    setReady(true);
  }, [Email]);
  
  const toggleYear = (year) => {
    if (expandedYear === year) {
      setExpandedYear(null);
    } else {
      setExpandedYear(year);
    }
  };

  return (
    
    <main>
      <div>
        <Navbar userData={userData}/>
        <br />
      </div>
      {courses && ready ? (
        <main>
          <div>
            <br></br>
            {/* วนลูปเพื่อแสดง container แยกตามปีการศึกษา */}
            {Object.entries(courses).map(([year, classes]) => (
              <div key={year} className="container-lg mb-3 bg-light" style={{ padding: '10px' }}>
                <div className="row row-cols-1 row-cols-md-5 g-2">
                  {/* วนลูปเพื่อแสดงข้อมูลคอร์สในแต่ละปีการศึกษา */}
                  {classes.map(course => (
                    <div className="card" style={{width: '200px'}} key={course.ClassID}>
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
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (null)}

      {(classes && Object.keys(classes).length > 0) && ready ? (
          <div>
            <br></br>
            {/* วนลูปเพื่อแสดง container แยกตามปีการศึกษา */}
            {Object.entries(classes).map(([year, classes]) => (
              <div key={year} className="container-lg mb-3 bg-light" style={{ padding: '10px' }}>
                <h5 className='unselectable' onClick={() => toggleYear(year)} style={{ cursor: 'pointer' }}>
                  {expandedYear === year ? <ChevronDown /> : <ChevronRight />} {year}
                </h5>

                {expandedYear === year && (
                  <div className="row row-cols-1 row-cols-md-5 g-2">
                    {/* วนลูปเพื่อแสดงข้อมูลคอร์สในแต่ละปีการศึกษา */}
                    {classes.map(course => (
                      <div className="card" style={{width: '200px'}} key={course.ClassID}>
                        <img className="card-img-top w-100 d-block" src={course.Thumbnail ? `${host}/Thumbnail/` + course.Thumbnail : "https://cdn-icons-png.flaticon.com/512/3643/3643327.png"} style={{ width: '190px', height: '190px', paddingTop: '5px', borderRadius: '5px'}}  alt="..."/>
                        {/* <img class="" style="width: 198px;height: 198px;"/> */}
                        <div className="card-body">
                          <h4 className="card-title">{course.ClassName}</h4>
                          <p className="card-text">ID: {course.ClassID}</p>
                          <button className="btn btn-primary" type="button" onClick={() => {sessionStorage.setItem("classId", course.ID);  sessionStorage.setItem("Email", Email);  navigate("/Class");}}>
                            View course
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
      ) : (
        <div className="container-lg mb-3 bg-light" style={{ padding: '10px' }}>
          <div className='align-items-left' style={{width:'100%'}}>
            <h5 className="text-start"style={{ cursor: 'pointer' }}>
              There is no class
            </h5>
          </div>
        </div>
      )}
    </main>
  );
}

export default HomeST;
