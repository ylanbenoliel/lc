/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { ClientContext } from "../stores/client";
import api from "../services/axios";
import { lower } from "../utils";
import User from "../components/User";
import useQueryString from "../hooks/useQueryString";

function App(props) {
  const { userInfo, setUserInfo } = useContext(ClientContext);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  // const [name, setName] = useQueryString("nome");
  // const [email, setEmail] = useQueryString("email");
  // const [id, setId] = useQueryString("id");

  const [order, setOrder] = useQueryString("ordem");

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

  // useEffect(() => {
  //   if (name.length !== 0) {
  //     setEmail("");
  //     setId("");
  //   }
  //   if (email.length !== 0) {
  //     setName("");
  //     setId("");
  //   }
  //   if (id.length !== 0) {
  //     setName("");
  //     setEmail("");
  //   }
  // }, [name, email, id]);

  function handleSearch(func) {
    return e => {
      func(e.target.value);
    };
  }

  function handleOrder(ev) {
    return setOrder(ev.target.value);
  }
  // function orderByNameDesc() {
  //   // console.log(userInfo.sort((a, b) => b.id - a.id)); id
  //   const filterNames = userInfo
  //     .map(user => lower(user.name.split(" ")[0]))
  //     .sort()
  //     .reverse();
  //   console.log(filterNames);
  // }

  function orderByIdDesc() {
    return (
      <>
        {userInfo
          .sort((a, b) => b.id - a.id)
          .map(info => (
            <div key={info.id}>
              <User {...info} />
            </div>
          ))}
      </>
    );
  }

  function showUsers() {
    return (
      <div>
        {userInfo
          .filter(
            user =>
              lower(user.name).includes(lower(name)) &&
              lower(user.email).includes(lower(email))
            // user.name.includes(name) && user.email.includes(email);
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
  }

  return (
    <React.Fragment>
      <h2>LC Sistemas</h2>
      <input type="text" value={name} onChange={handleSearch(setName)} />
      <input type="text" value={email} onChange={handleSearch(setEmail)} />
      <input type="number" value={id} onChange={handleSearch(setId)} />
      <br />
      <br />
      <label>
        <input
          type="radio"
          value="crescente"
          checked={order === "crescente"}
          onChange={handleOrder}
        />
        Crescente
      </label>
      <label>
        <input
          type="radio"
          value="decrescente"
          checked={order === "decrescente"}
          onChange={handleOrder}
        />
        Decrescente
      </label>
      <button onClick={orderByIdDesc}>Ordenar</button>
      <div>{!isLoading && showUsers()}</div>
    </React.Fragment>
  );
}

export default App;
