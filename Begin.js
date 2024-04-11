import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
// import { Link } from "react-router-dom";
// import "./App.css";
function Begin() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyB0pJMZ5BOqHKM9V6jswqqawwga4OQPV28",
    authDomain: "fir-dc608.firebaseapp.com",
    databaseURL: "https://fir-dc608-default-rtdb.firebaseio.com",
    projectId: "fir-dc608",
    storageBucket: "fir-dc608.appspot.com",
    messagingSenderId: "362096921282",
    appId: "1:362096921282:web:4fe7d6cbd889f3c226895b",
  };
  const app = initializeApp(firebaseConfig);
  const dataBase = getDatabase(app);
  const movies = ref(dataBase, "movies");
  const handleClick = () => {
    // console.log(message);
    push(todoInDb, message);
    delmessage();
  };
  const delmessage = () => {
    setMessage("");
  };
  useEffect(() => {
    retrieve();
  }, []);
  const retrieve = () => {
    onValue(todoInDb, (snapshot) => {
      let arrayList = [];
      if (snapshot.val()) {
        arrayList = Object.entries(snapshot.val());
      }
      // console.log(arrayList);
      setData(arrayList);
    });
  };
  const removeData = (id) => {
    let exactLocation = ref(dataBase, `toDOlIST/${id}`);
    console.log(exactLocation);
    remove(exactLocation);
  };
  return (
    <div className="Appp">
      <main className="Begin">
        <input
          type="text"
          onChange={handleChange}
          className="input"
          value={message}
          placeholder="input daily tasks"
        />
        <div className="btn">
          <button onClick={handleClick}>Add</button>
          <button onClick={retrieve}>reterireve</button>
        </div>
      </main>
      {data ? (
        <div>
          {data.map((employee) => {
            return (
              <div>
                <button
                  style={{ border: "none", backgroundColor: "white" }}
                  onClick={() => removeData(employee[0])}
                >
                  <p>{employee[1]}</p>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      <a href="/image">Upload Image</a>
    </div>
  );
}

export default Begin;