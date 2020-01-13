/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from "react";
import "../styles/main.css";
import { ClientContext } from "../stores/client";
import api from "../services/axios";
import { lower, compareValues } from "../utils";
import User from "../components/User";
import useQueryString from "../hooks/useQueryString";

const helpers = {
  nome: "nome",
  id: "id",
  email: "email",
  desc: "desc",
  asc: "asc",
  ordem: "ordem",
  por: "por"
};

function App(props) {
  const { userInfo, setUserInfo } = useContext(ClientContext);
  const [userFilterList, setUserFilterList] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useQueryString("nome", "");
  const [email, setEmail] = useQueryString("email", "");
  const [id, setId] = useQueryString("id", "");
  const [order, setOrder] = useQueryString("ordem", "");
  const [orderBy, setOrderBy] = useQueryString("por", "");

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
      .catch(e => {
        console.log(e);
      });
  }

  //init effect
  useEffect(() => {
    //FIXME fazer pesquisa inicial

    fetchUsers();
    filterUserParams();
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

  function filterUserParams() {
    if (!order) setOrder(helpers.asc);
    if (!orderBy) setOrderBy(helpers.id);

    if (order === helpers.asc) {
      if (orderBy === helpers.id) {
        const filterIds = userInfo.sort(
          (a, b) => parseInt(a.id) + parseInt(b.id)
        );
        setUserInfo(...filterIds);
      }
      if (orderBy === helpers.nome) {
        const filterNames = userInfo.sort(compareValues("name", helpers.asc));
        setUserInfo(...filterNames);
      }
      if (orderBy === helpers.email) {
        const filterEmails = userInfo.sort(compareValues("email", helpers.asc));
        setUserInfo(...filterEmails);
      }
    }

    if (order === helpers.desc) {
      if (orderBy === helpers.id) {
        const filterIds = userInfo.sort(
          (a, b) => parseInt(b.id) - parseInt(a.id)
        );
        setUserInfo(...filterIds);
      }
      if (orderBy === helpers.nome) {
        const filterNames = userInfo.sort(compareValues("name", helpers.desc));
        setUserInfo(...filterNames);
      }
      if (orderBy === helpers.email) {
        const filterEmails = userInfo.sort(
          compareValues("email", helpers.desc)
        );
        setUserInfo(...filterEmails);
      }
    }

    const filterUsersInput = userInfo
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
        if (id.length !== 0) return user.id == id;
        return user.id !== id;
      });
    setUserFilterList(filterUsersInput);
    setIsLoading(false);
  }

  function searchUser(e) {
    e.preventDefault();

    setIsLoading(true);
    fetchUsers();

    filterUserParams();
  }

  function showUsers() {
    if (Object.keys(userFilterList).length > 0) {
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
            {userFilterList.map(data => (
              <React.Fragment key={data.id}>
                <User {...data} />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      );
    }
    if (Object.keys(userFilterList).length == 0) {
      return (
        <div className="user-not-found">
          <p>Usuário nao encontrado</p>
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      <h2 className="title">LC Sistemas</h2>
      <form>
        <input
          type="text"
          value={id}
          onChange={handleSearch(setId)}
          placeholder="Digite o ID"
          id="inputId"
        />
        <input
          type="text"
          value={name}
          onChange={handleSearch(setName)}
          placeholder="Digite o nome"
          id="inputName"
        />
        <input
          type="text"
          value={email}
          onChange={handleSearch(setEmail)}
          placeholder="Digite o e-mail"
          id="inputEmail"
        />
      </form>

      <form>
        <label>Ordem</label>
        <div className="input-check">
          <label>
            <input
              type="radio"
              value="asc"
              checked={order === "asc"}
              onChange={handleSearch(setOrder)}
            />
            Crescente
          </label>

          <label>
            <input
              type="radio"
              value="desc"
              checked={order === "desc"}
              onChange={handleSearch(setOrder)}
            />
            Decrescente
          </label>
        </div>

        <label>Filtrar</label>
        <div className="input-check">
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
        </div>

        <button onClick={searchUser}>Buscar</button>
      </form>
      <div>
        {isLoading ? <p className="loading">Carregando...</p> : showUsers()}
      </div>
    </React.Fragment>
  );
}

export default App;
