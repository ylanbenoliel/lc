/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "../styles/main.css";
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
  const [orderBy, setOrderBy] = useState("");

  const [queryName, setQueryName] = useQueryString("nome");
  const [queryEmail, setQueryEmail] = useQueryString("email");
  const [queryId, setQueryId] = useQueryString("id");
  const [queryOrder, setQueryOrder] = useQueryString("ordem");
  const [queryBy, setQueryBy] = useQueryString("por");

  async function fetchUsers() {
    await api
      .get("&results=50")
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
    if (queryBy) setOrderBy(queryBy);
  }, []);

  function removePercentage(string) {
    if (string.includes("%")) return string.replace(new RegExp("%", "g"), "");
    else return string;
  }

  function handleSearch(func) {
    return e => {
      func(e.target.value);
    };
  }
  function toggleOrder() {
    return queryOrder === "" ? setQueryOrder("dec") : setQueryOrder("");
  }

  function showUsers() {
    let filteredUsers = userInfo
      .filter(user => {
        if (name.includes("%"))
          return lower(user.name).includes(lower(removePercentage(name)));

        if (name.length !== 0)
          return lower(user.name.slice(0, name.length)) === lower(name);

        return user.name !== name;
      })
      .filter(user => {
        if (email.includes("%"))
          return lower(user.email).includes(lower(removePercentage(email)));

        if (email.length !== 0)
          return lower(user.email.slice(0, email.length)) === lower(email);

        return user.email !== email;
      })
      .filter(user => {
        if (id.includes("%")) {
          return user.id.includes(removePercentage(id));
        }
        if (id.length !== 0) return user.id === id;
        return user.id !== id;
      });

    if (Object.keys(filteredUsers).length !== 0) {
      return (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(data => (
              <React.Fragment key={data.id}>
                <User {...data} />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <div>
          <p>Usuário nao encontrado</p>
        </div>
      );
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
          type="checkbox"
          value="dec"
          checked={queryOrder === "dec"}
          onChange={toggleOrder}
        />
        Decrescente
      </label>

      <label>
        <input
          type="radio"
          value="id"
          checked={orderBy === "id"}
          onChange={handleSearch(setOrderBy)}
        />
        Por id
      </label>

      <label>
        <input
          type="radio"
          value="nome"
          checked={orderBy === "nome"}
          onChange={handleSearch(setOrderBy)}
        />
        Por nome
      </label>

      <label>
        <input
          type="radio"
          value="email"
          checked={orderBy === "email"}
          onChange={handleSearch(setOrderBy)}
        />
        Por e-mail
      </label>

      <br />
      <br />
      <button>Ordenar</button>
      <div>{!isLoading && showUsers()}</div>
    </React.Fragment>
  );
}

export default App;
