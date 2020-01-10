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
  const [order, setOrder] = useState("");

  const [queryName, setQueryName] = useQueryString("nome");
  const [queryEmail, setQueryEmail] = useQueryString("email");
  const [queryId, setQueryId] = useQueryString("id");
  const [queryOrder, setQueryOrder] = useQueryString("ordem");

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

  //init effect
  useEffect(() => {
    fetchUsers();

    if (queryName) setName(queryName);
    if (queryEmail) setEmail(queryEmail);
    if (queryId) setId(queryId);
    if (queryOrder) setOrder(queryOrder);
  }, []);

  function verifyPercentage(string) {
    if (string.includes("%")) return string.replace(new RegExp("%", "g"), "");
    else return string;
  }

  function handleSearch(func) {
    return e => {
      func(e.target.value);
    };
  }

  function showUsers() {
    const filteredUsers = userInfo
      .filter(
        user =>
          lower(user.name).includes(lower(name)) &&
          lower(user.email).includes(lower(email))
      )
      .sort()
      .filter(user => {
        if (id.includes("%")) return user.id.includes(verifyPercentage(id));
        if (id.length !== 0) return user.id === id;
        else return user.id !== id;
      })
      .map(user => (
        <div key={user.id}>
          <User {...user} />
        </div>
      ));

    if (Object.keys(filteredUsers).length !== 0) {
      return <div>{filteredUsers}</div>;
    } else {
      return <div>Usuário nao encontrado</div>;
    }
  }

  return (
    <React.Fragment>
      <h2>LC Sistemas</h2>
      <input type="text" value={name} onChange={handleSearch(setName)} />
      <input type="text" value={email} onChange={handleSearch(setEmail)} />
      <input type="text" value={id} onChange={handleSearch(setId)} />

      <br />
      <br />
      <label>
        <input
          type="radio"
          value="crescente"
          checked={order === "crescente"}
          onChange={handleSearch(setOrder)}
        />
        Crescente
      </label>
      <label>
        <input
          type="radio"
          value="decrescente"
          checked={order === "decrescente"}
          onChange={handleSearch(setOrder)}
        />
        Decrescente
      </label>
      <br />
      <button>Ordenar</button>
      <br />
      <button>Buscar</button>
      <div>{!isLoading && showUsers()}</div>
    </React.Fragment>
  );
}

export default App;
