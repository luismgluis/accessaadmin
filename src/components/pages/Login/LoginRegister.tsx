import React, { useCallback, useState } from "react";
import Api from "../../../api/Api";
import { useCustomAlert } from "../../hooks/customAlert";
import { useTheme } from "../../hooks/useTheme";
import CButton from "../../ui/CButton/CButton";
import CInput from "../../ui/CInput/CInput";
import CText from "../../ui/CText/CText";
import Panel from "../../ui/Panel/Panel";
const TAG = "LOGIN REGISTER";
type LoginRegisterProps = {
  onGoToBack?: () => void;
};
const LoginRegister: React.FC<LoginRegisterProps> = ({
  onGoToBack = () => null,
}) => {
  console.log(TAG, "render");
  const theme = useTheme();
  const alert = useCustomAlert();
  const [form, setForm] = useState({
    user: "",
    pass: "",
    pass2: "",
    name: "",
    nickname: "",
  });
  const loginAction = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (form.user === "" || !form.user.includes("@")) {
        alert.error("Email invalido");
        return;
      }
      if (form.name === "") {
        alert.error("Nombre invalido");
        return;
      }
      if (form.nickname === "") {
        alert.error("Usuario invalido");
        return;
      }
      if (form.pass === "") {
        alert.error("Clave invalida");
        return;
      }
      if (form.pass !== form.pass2) {
        alert.error("Claves diferentes");
        return;
      }
      Api.database.user
        .createUserWithEmail(form.name, form.nickname, form.user, form.pass)
        .then((data) => {
          alert.info("Creado con exito");
          setForm({
            user: "",
            pass: "",
            pass2: "",
            name: "",
            nickname: "",
          });
          onGoToBack();
        })
        .catch((err) => {
          alert.error("Creacion fallida", err.code);
        });

      //  login(form.user, form.pass);
    },
    [form, alert, onGoToBack]
  );
  return (
    <Panel className="LoginForm">
      <Panel>
        <Panel paddingY={20}>
          <CText
            color={theme.colors["color-primary-800"]}
            paddingY={10}
            type="h2"
          >
            Accessa
          </CText>
        </Panel>

        <form id="formRegister" onSubmit={(e) => loginAction(e)}>
          <Panel>
            <CInput
              label="Nombre"
              id="registerUser"
              placeHolder="Juan perez"
              marginX={20}
              marginY={10}
              value={form.name}
              onUpdate={(val) => setForm({ ...form, name: val })}
            />
            <CInput
              label="Usuario"
              placeHolder="@jperez"
              marginX={20}
              marginY={10}
              value={form.nickname}
              onUpdate={(val) => setForm({ ...form, nickname: val })}
            />
            <CInput
              label="Email"
              id="registerEmail"
              placeHolder="usuario@email.com"
              marginX={20}
              marginY={10}
              value={form.user}
              onUpdate={(val) => setForm({ ...form, user: val })}
            />
            <CInput
              label="Contraseña"
              id="registerPass1"
              name="current-password"
              autoComplete="off"
              marginX={20}
              marginY={10}
              placeHolder="********"
              type="password"
              value={form.pass}
              onUpdate={(val) => setForm({ ...form, pass: val })}
            />
            <CInput
              label="Reperir contraseña"
              id="registerPass1"
              name="current-password"
              autoComplete="off"
              marginX={20}
              marginY={10}
              placeHolder="********"
              type="password"
              value={form.pass2}
              onUpdate={(val) => setForm({ ...form, pass2: val })}
            />
            <CButton marginX="10px" text="REGISTRARSE" />
          </Panel>
        </form>
        <CButton
          onPress={() => onGoToBack()}
          ghost
          marginX="20%"
          text="Volver"
        />
      </Panel>
    </Panel>
  );
};
export default LoginRegister;
