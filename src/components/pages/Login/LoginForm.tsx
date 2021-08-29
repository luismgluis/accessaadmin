import "./Login.scss";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import AppIcon from "../../../icons/AppIcon/AppIcon";
import CButton from "../../ui/CButton/CButton";
import CInput from "../../ui/CInput/CInput";
import CText from "../../ui/CText/CText";
import Panel from "../../ui/Panel/Panel";
import { useCustomAlert } from "../../hooks/customAlert";
import Api from "../../../api/Api";
import { useTheme } from "../../hooks/useTheme";
import { useCurrentUser, useSetCurrentUser } from "../../hooks/currentUser";
import UserType from "../../../types/UserType";

const TAG = "LOGIN FORM";
type LoginFormProps = {
  onGoToNext?: () => void;
};
const LoginForm: React.FC<LoginFormProps> = ({ onGoToNext = () => null }) => {
  console.log(TAG);
  const history = useHistory();
  const alert = useCustomAlert();
  const theme = useTheme();

  const [form, setForm] = useState({
    user: "",
    pass: "",
  });
  const [formCreate, setFormCreate] = useState({
    name: "",
    user: "",
    pass: "",
  });
  const [loadingEnabled] = useState(false);
  const [createEnabled, setCreateEnabled] = useState(false);
  const setMe = useSetCurrentUser();
  const me = useCurrentUser();
  const login = useCallback(
    (email: string, pass: string) => {
      console.log(TAG, "loginclick");
      const fail = () => {
        alert.error("Login Fallido");
      };
      Api.app
        .loginWithEmail(email, pass)
        .then((data) => {
          const uid = Api.app.me()?.uid;
          if (uid) {
            Api.database.user
              .getUser(uid)
              .then((user) => {
                if (!user.isEmpty()) {
                  setMe(user);
                  alert.info("Login Correcto");
                  history.push("/home");
                }
              })
              .catch((err) => {
                fail();
              });
          } else {
            fail();
          }
        })
        .catch((err) => {
          fail();
        });
    },
    [alert, history, setMe]
  );

  const loginAction = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (form.user) {
        console.log(TAG, form);
      }
      login(form.user, form.pass);
    },
    [form, login]
  );

  const create = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      alert.error("Creacion restringida a la app movil", "Rechazado");
      //history.push("/home");
    },
    [alert]
  );

  return (
    <Panel className="LoginForm">
      <Panel>
        <Panel paddingY={20}>
          <div className="appIcon">
            <AppIcon width={100} color={theme.colors["color-primary-500"]} />
          </div>

          <CText
            color={theme.colors["color-primary-800"]}
            paddingY={10}
            type="h2"
          >
            Accessa
          </CText>
        </Panel>
        {!loadingEnabled && !createEnabled && (
          <>
            <form onSubmit={(e) => loginAction(e)}>
              <Panel>
                <CInput
                  label="Usuario"
                  placeHolder="usuario@email.com"
                  marginX={20}
                  marginY={10}
                  value={form.user}
                  onUpdate={(val) => setForm({ ...form, user: val })}
                />
                <CInput
                  label="Contraseña"
                  name="current-password"
                  autoComplete="on"
                  marginX={20}
                  marginY={10}
                  placeHolder="********"
                  type="password"
                  value={form.pass}
                  onUpdate={(val) => setForm({ ...form, pass: val })}
                />
                <CButton marginX="10px" text="LOGIN" />
              </Panel>
            </form>
            <CButton
              onPress={() => onGoToNext()}
              ghost
              marginX="20%"
              text="Registrarse"
            />
          </>
        )}
        {!loadingEnabled && createEnabled && (
          <>
            <form onSubmit={(e) => create(e)}>
              <Panel>
                <CInput
                  label="Nombre completo"
                  placeHolder="Chavelo ..."
                  marginX={20}
                  marginY={10}
                  value={formCreate.name}
                  onUpdate={(val) =>
                    setFormCreate({ ...formCreate, name: val })
                  }
                />
                <CInput
                  label="Usuario"
                  placeHolder="usuario@email.com"
                  marginX={20}
                  marginY={10}
                  value={formCreate.user}
                  onUpdate={(val) =>
                    setFormCreate({ ...formCreate, user: val })
                  }
                />
                <CInput
                  label="Contraseña"
                  marginX={20}
                  marginY={10}
                  name="current-password"
                  autoComplete="on"
                  placeHolder="********"
                  type="password"
                  value={formCreate.pass}
                  onUpdate={(val) =>
                    setFormCreate({ ...formCreate, pass: val })
                  }
                />
                <CButton marginX="10px" text="CREAR CUENTA" />
              </Panel>
            </form>
            <CButton
              onPress={() => setCreateEnabled(false)}
              ghost
              marginX="20%"
              text="Cancelar"
            />
          </>
        )}
      </Panel>
    </Panel>
  );
};
export default LoginForm;
