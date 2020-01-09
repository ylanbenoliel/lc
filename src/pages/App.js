/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { ClientContext } from "../stores/client";
import api from "../services/axios";

function App(props) {
  const { userInfo, setUserInfo } = useContext(ClientContext);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUsers() {
    await api
      .get(
        "?results=50&nat=br&inc=name,email,location,cell,picture&seed=988ce3b1e38ebe0d&noinfo"
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
        setIsLoading(true);
      })
      .catch(error => console.log(error));
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  function showUsers() {
    return (
      <div>
        {userInfo.map(user => {
          const { name, email, image, id } = user;
          return (
            <div key={id}>
              <p>
                {name} {id}
              </p>
              <div>
                <img src={image} alt={name} />
              </div>
              <p>{email}</p>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <React.Fragment>
      <h2>Random User</h2>
      <div>{isLoading && showUsers()}</div>
    </React.Fragment>
  );
}

export default App;
