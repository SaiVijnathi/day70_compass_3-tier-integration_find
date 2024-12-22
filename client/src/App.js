import './App.css';
import {useState} from 'react';


function App() {

  let [studentsList,setStudentsList] = useState([]);


  let getStudentListFromServer = async ()=>{
    let reqOptions={
      method:"GET",
    }

    try {
      let JSONData = await fetch("http://localhost:8888/studentsList", reqOptions);
      let JSOData = await JSONData.json();
      console.log(JSOData);
      setStudentsList(JSOData);
    } 
    catch (err) {
      console.log("Error fetching data");
    }
  };

  return (
    <div className="App">
      <button onClick={()=>{
        getStudentListFromServer();
      }}>Get Students List</button>
      <br></br>
      {studentsList.map((ele,i) =>{
        return (
          <div key={i} style={{border:"1px solid black"}}>
          <h2>First Name:{ele.firstName}</h2>
          <h2>Last Name:{ele.lastName}</h2>
          <h2>Age:{ele.age}</h2>
          <h2>Email:{ele.email}</h2>
          <h2>Gender:{ele.gender}</h2>
          <h2>Batch ID:{ele.batchId}</h2>
          <h2>Marital Status:{ele.maritalStatus}</h2>

        </div>
        )
      })}
    </div>
  );
}

export default App;
