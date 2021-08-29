import "./GroupSelect.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Panel from "../../ui/Panel/Panel";
import CInput from "../../ui/CInput/CInput";
import { Table } from "@itwin/itwinui-react";
import { useScreenSize } from "../../hooks/windowResize";
import Api from "../../../api/Api";
import { useCurrentUser } from "../../hooks/currentUser";
import GroupType from "../../../types/GroupType";
import { useCustomAlert } from "../../hooks/customAlert";
import CText from "../../ui/CText/CText";
import CButton from "../../ui/CButton/CButton";
import CButtonImage from "../../ui/CButtonImage/CButtonImage";
import CheckIcon from "../../../icons/CheckIcon";
import { useTheme } from "../../hooks/useTheme";
import { useSetCurrentGroup } from "../../hooks/currentGroup";
import GroupSelectCreate from "./GroupSelectCreate";
import { useHomeGoTo, useSetHomeGoTo } from "../../hooks/useHomeGoTo";
const TAG = "GROUP SELECT";
type GroupSelectProps = {
  loadLast?: boolean;
};
const GroupSelect: React.FC<GroupSelectProps> = ({ loadLast }) => {
  console.log(TAG, "render");
  const screen = useScreenSize(true);
  const theme = useTheme();
  const me = useCurrentUser();
  const alert = useCustomAlert();
  const setGroup = useSetCurrentGroup();
  const goTo = useSetHomeGoTo();
  const [groups, setGroups] = useState<GroupType[]>([]);
  useEffect(() => {
    if (me.isEmpty()) {
      return;
    }
    const saveGroup = localStorage.getItem("currentGroup");
    if (loadLast) {
      if (saveGroup !== null) {
        const data = JSON.parse(saveGroup);
        try {
          const newGroup = new GroupType(data.id, data);
          if (!newGroup.isEmpty()) {
            setGroup(newGroup);
            return;
          }
        } catch (error) {}
      }
    }

    const groupsInfo = (idGroups: string[]) => {
      const arrGroups: GroupType[] = [];
      const insert = (data: GroupType) => {
        arrGroups.push(data);
        if (arrGroups.length === idGroups.length) {
          const res = arrGroups.filter((item) => !item.isEmpty());
          if (res.length > 0) {
            setGroups(res);
            return;
          }
          alert.info("Sin datos de grupos propios");
        }
      };
      idGroups.forEach((idGroup) => {
        Api.database.group
          .getGroupInfo(idGroup)
          .then((data) => {
            insert(data);
          })
          .catch((err) => {
            insert(new GroupType("", null));
          });
      });
    };
    const unsub = Api.database.group.getGroupsIds(
      me,
      (data) => {
        if (data.length > 0) {
          groupsInfo(data);
          return;
        }
        console.log(TAG, data);
        alert.info("No se encontraron grupos asociados a ti");
      },
      (err) => {
        alert.info("Obtencion de grupos fallida", "Error");
      }
    );

    return () => unsub();
  }, [me, alert, loadLast, setGroup]);

  const selectGroup = useCallback(
    (group: GroupType) => {
      if (!group.isEmpty()) {
        setGroup(group);
        localStorage.setItem(
          "currentGroup",
          JSON.stringify(group.exportToUpload(true))
        );
        goTo("search");
        return;
      }
      alert.info("Grupo vacio");
    },
    [setGroup, alert]
  );

  return (
    <Panel
      overflow="auto"
      totalHeight={85}
      paddingX={10}
      paddingY={10}
      className="GroupSelect"
    >
      <CText type="p" color={theme.colors["color-primary-900"]}>
        Escoge un grupo del listado para trabajar con el como predeterminado
      </CText>
      <Panel verticalCenter width={"100%"} paddingY={10}>
        {groups.map((g, index) => (
          <Panel
            level={index % 2 === 0 ? "5" : "3"}
            // width="60%"
            flex
            flexDirection="row"
            paddingY={20}
            paddingX={20}
          >
            <Panel verticalCenter>
              <CText>{g.name}</CText>
            </Panel>
            {/* <CButtonImage
              onPress={() => selectGroup(g)}
              width={50}
              icon={<CheckIcon width={50} />}
            /> */}
            <CButton
              width={150}
              onPress={() => selectGroup(g)}
              text="Seleccionar"
            ></CButton>
          </Panel>
        ))}
      </Panel>
      <Panel level="5" flex paddingX={15} paddingY={10}>
        <CText color={theme.colors["color-primary-600"]}>Acciones</CText>
      </Panel>
      <Panel>
        <GroupSelectCreate />
      </Panel>
    </Panel>
  );
};
export default GroupSelect;
