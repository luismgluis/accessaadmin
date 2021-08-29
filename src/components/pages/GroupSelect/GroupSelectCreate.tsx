import React, { useState } from "react";
import { useCallback } from "react";
import Api from "../../../api/Api";
import { useCurrentUser } from "../../hooks/currentUser";
import { useCustomAlert } from "../../hooks/customAlert";
import CButton from "../../ui/CButton/CButton";
import CInput from "../../ui/CInput/CInput";
import CText from "../../ui/CText/CText";
import Panel from "../../ui/Panel/Panel";
const TAG = "";
type GroupSelectCreateProps = {};
const GroupSelectCreate: React.FC<GroupSelectCreateProps> = ({}) => {
  console.log(TAG, "render");
  const [enabledCreate, setEnabledCreate] = useState(false);
  const [form, setForm] = useState({ name: "", nickname: "" });
  const alert = useCustomAlert();

  const me = useCurrentUser();
  const create = useCallback(() => {
    const at = form.nickname.replace("@", "").replace(" ", "");
    const al = alert.loading("Creando grupo...");
    Api.database.group
      .createGroup(form.name, at, me)
      .then((data) => {
        console.log(data);
        al();
        alert.info(`Grupo @${at} fue creado`);
        setForm({ name: "", nickname: "" });
        setEnabledCreate(false);
      })
      .catch((err) => {
        console.log(TAG, err);
        al();
        alert.error("Fallo la creacion del nuevo grupo");
      });
  }, [me, form, alert]);
  return (
    <div className="GroupSelectCreate">
      {enabledCreate && (
        <Panel paddingY={20} paddingX={20}>
          <CInput
            onUpdate={(t) => setForm({ ...form, name: t })}
            marginY={10}
            label="Nombre del nuevo grupo"
            placeHolder="Sub division X"
          />
          <CInput
            onUpdate={(t) => setForm({ ...form, nickname: t })}
            marginY={10}
            label="Usuario / Alias / Arroba del grupo"
            placeHolder="@alias99"
          />
          <CText type="p">
            * Este grupo sera privado, necesitara ser activado despues de 7
            dias, de lo contrario se eliminara.
          </CText>
          <CButton text="CREAR" onPress={() => create()} />
          <CButton
            text="Cancelar"
            ghost
            onPress={() => setEnabledCreate(false)}
          />
        </Panel>
      )}
      {!enabledCreate && (
        <CButton
          width={"50%"}
          text="Crear grupo"
          onPress={() => setEnabledCreate(true)}
        />
      )}
    </div>
  );
};
export default GroupSelectCreate;
