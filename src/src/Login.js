import React,{ useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './Navbar.js';
import { useNavigate,useLocation } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';


function App() {
  const navigate = useNavigate();

  const [assignmentData, setAssignmentData] = useState(null);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const classData = location.state;
  const Email = classData.Email;
  const classId = classData.classid;


//   useEffect(() => {
//     console.log('getHome:',classData);

//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}/ST/user/profile?Email=${Email}`);
//         const userdata = await response.json();
//         console.log('user:', userdata);
//         setUserData(userdata);
//         console.log(userdata.ID);
//         // Call fetchData here after setting userData
//         fetchData(userdata.ID);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
  
//     const fetchData = async (userId) => {
//       try {
//         console.log(classId)
//         const response = await fetch(`http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}/ST/assignment/all?SID=${userId}&CID=${classId}`);
//         const data = await response.json();
//         console.log(data);
//         setAssignmentData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchUserData();
    
//   }, []);
  
  //Check TurnIn Late
//   function CheckSend(labData) {
//     let turnInCount = 0;
//     let totalQuestions = 0;
//     for (const question in labData) {
//         if (question.startsWith("Q")) {
//             totalQuestions++;
//             if (labData[question].IsTurnIn) {
//                 turnInCount++;
//             }}}
//     return `${turnInCount}/${totalQuestions}`;
// }

  //Check Status
//   function generateBadge(labData) {
//     const sendStatus = CheckSend(labData);
//     const [turnInCount, totalQuestions] = sendStatus.split('/');
    
//     // Convert string to numbers
//     const numTurnIn = parseInt(turnInCount);
//     const numTotalQuestions = parseInt(totalQuestions);

//     const allTurnIn = numTurnIn === numTotalQuestions;
    
//     let anyLate = false;

//     // Iterate over each lab in labData
//     for (const lab in labData) {
//         if (Object.prototype.hasOwnProperty.call(labData, lab)) {
//             // Iterate over each question in the lab
//             for (const question in labData[lab]) {
//                 if (question.startsWith("Q")) {
//                     // Check if the question is late
//                     if (labData[lab][question].IsLate) {
//                         anyLate = true;
//                         break; // no need to continue checking if any question is late
//                     }
//                 }
//             }
//         }
//     }

//     let status;
//     if (allTurnIn) {
//         status = 'Success';
//     } else if (anyLate) {
//         status = 'Late';
//     } else {
//         status = 'Waiting';
//     }

//     const badgeClass = status === 'Success' ? 'success' : status === 'Late' ? 'warning' : 'warning';
//     const badgeText = `Submitted - (${turnInCount}/${totalQuestions})`;

//     return (
//         <h5>
//             <span className={`badge bg-${badgeClass}`}>
//                  {badgeText}
//             </span>
//         </h5>
//     );
// }




    return (
        <div className="App">
            <h1>Login</h1>
        </div>
    );
}


export default App;
