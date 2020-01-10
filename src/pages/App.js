/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { ClientContext } from "../stores/client";
import api from "../services/axios";
import { lower } from "../utils";
import User from "../components/User";
// import Highlight from "../components/Highlight";

function App(props) {
  const { userInfo, setUserInfo } = useContext(ClientContext);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  async function fetchUsers() {
    await api
      .get(
        "?results=50&nat=br&inc=name,email,cell,picture&seed=988ce3b1e38ebe0d&noinfo"
      )
      .then(response =>
        response.data.results.map((user, index) => ({
          id: `${index + 1}`,
          name: `${user.name.first} ${user.name.last}`,
          email: `${user.email}`,
          image: `${user.picture.thumbnail}`
        }))
      )
      .then(users => {
        setUserInfo(users);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (name.length !== 0) {
      setEmail("");
      setId("");
    }
    if (email.length !== 0) {
      setName("");
      setId("");
    }
    if (id.length !== 0) {
      setName("");
      setEmail("");
    }
  }, [name, email, id]);

  function handleSearch(func) {
    return e => {
      func(e.target.value);
    };
  }

  const showUsers = () => {
    return (
      <div>
        {userInfo
          .filter(
            user =>
              lower(user.name).includes(lower(name)) &&
              lower(user.email).includes(lower(email))
          )
          .filter(user => {
            if (id.length !== 0) return user.id === id;
            else return user.id !== id;
          })
          .map(user => (
            <div key={user.id}>
              <User {...user} />
            </div>
          ))}
      </div>
    );
  };

  return (
    <React.Fragment>
      <h2>LC Sistemas</h2>
      <input type="text" value={name} onChange={handleSearch(setName)} />
      <input type="text" value={email} onChange={handleSearch(setEmail)} />
      <input type="number" value={id} onChange={handleSearch(setId)} />
      <div>{!isLoading && showUsers()}</div>
    </React.Fragment>
  );
}

export default App;
