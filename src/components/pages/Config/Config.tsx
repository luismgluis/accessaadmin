import "./Config.scss";
import React, { useEffect, useState } from "react";
import Panel from "../../ui/Panel/Panel";
import CText from "../../ui/CText/CText";
import { useCurrentGroup } from "../../hooks/currentGroup";
import { useCallback } from "react";
import Api from "../../../api/Api";
import UserType from "../../../types/UserType";
import CButton from "../../ui/CButton/CButton";
import { useCustomAlert } from "../../hooks/customAlert";
import CInput from "../../ui/CInput/CInput";

const TAG = "Config";
type ConfigProps = {
  prop1?: any;
};
const Config: React.FC<ConfigProps> = ({ prop1 }) => {
  console.log(TAG, "render");
  const alert = useCustomAlert();
  const group = useCurrentGroup();
  const [users, setUsers] = useState<UserType[]>([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    at: "",
    password: "",
  });
  const loadUsers = useCallback(() => {
    Api.database.group
      .getMembers(group.id)
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        setUsers([]);
      });
  }, [group]);

  const removeUser = useCallback(
    (id: string) => {
      Api.database.group
        .removeMember(group.id, id)
        .then((res) => {
          loadUsers();
          alert.info("Usuario eliminado");
        })
        .catch((err) => {
          alert.info("Fallo");
        });
    },
    [group, alert, loadUsers]
  );

  const createUser = useCallback(() => {
    const addgroup = (uid: string, notNew: boolean = false) => {
      Api.database.group
        .addUserToMyGroup(group.id, uid)
        .then(() => {
          console.log("ok");
          alert.info("Usuario agregado");
          if (notNew) {
            alert.info(
              "El Usuario con ese email ya existia en accessa, se agrego igualmente a '" +
                group.name +
                "'.",
              "",
              20000
            );
          }
          setNewUser({ name: "", email: "", password: "", at: "" });
          loadUsers();
        })
        .catch((err) => {
          console.log(err);
          alert.info("Fallo, intenta de nuevo");
        });
    };
    Api.database.user
      .createUserWithEmail(
        newUser.name,
        newUser.at,
        newUser.email,
        newUser.password
      )
      .then((uid) => {
        addgroup(uid);
      })
      .catch((err) => {
        if (`${err.code}`.includes("Email en uso")) {
          if (err.uid) {
            if (err.user) {
              alert.info(
                "Usuario ya existe, nombre: " + err.user.name,
                "",
                20000
              );
            }
            addgroup(err.uid, true);
            return;
          }

          alert.info("Fallo comunicate con soporte");
        } else {
          alert.info("Fallo, intenta de nuevo");
        }
      });
  }, [group, alert, newUser, loadUsers]);
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div className="Config">
      <Panel paddingX={20} paddingY={20}>
        <Panel flex level="4">
          <CText>Usuarios en: {group.name}</CText>
        </Panel>
        <Panel paddingY={20}>
          {users.map((user, index) => (
            <Panel level={index % 2 === 0 ? "5" : "0"} flex flexDirection="row">
              <Panel width="100%" verticalCenter>
                <CText>{user.name}</CText>
              </Panel>
              <CButton
                text="Eliminar"
                width={100}
                onPress={() => removeUser(user.id)}
              />
            </Panel>
          ))}
        </Panel>
        <Panel flex level="4">
          <CText>Agregar usuario</CText>
        </Panel>

        <Panel width={"50%"}>
          <CInput
            label="Nombre:"
            marginY={10}
            value={newUser.name}
            onUpdate={(t) => setNewUser({ ...newUser, name: t })}
          />
          <CInput
            label="Alias:"
            marginY={10}
            value={newUser.at}
            onUpdate={(t) => setNewUser({ ...newUser, at: t })}
          />
          <CInput
            label="Email:"
            marginY={10}
            value={newUser.email}
            onUpdate={(t) => setNewUser({ ...newUser, email: t })}
          />
          <CInput
            label="Clave:"
            marginY={10}
            value={newUser.password}
            type="password"
            onUpdate={(t) => setNewUser({ ...newUser, password: t })}
          />
          <CButton text="Crear" onPress={() => createUser()} />
        </Panel>
      </Panel>
    </div>
  );
};
export default Config;
