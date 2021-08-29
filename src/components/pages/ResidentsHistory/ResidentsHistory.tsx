import "./ResidentHistory.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CText from "../../ui/CText/CText";
import ResidentType from "../../../types/ResidentType";
import Panel from "../../ui/Panel/Panel";
import { Table } from "@itwin/itwinui-react";
import { useSetHomeGoTo } from "../../hooks/useHomeGoTo";
import { useScreenSize } from "../../hooks/windowResize";
import CButton from "../../ui/CButton/CButton";
import Api from "../../../api/Api";
import { useCurrentGroup } from "../../hooks/currentGroup";
import { useCustomAlert } from "../../hooks/customAlert";
import { ResidentAccess } from "../../../types/ResidentAccess";

import CsvDownloader from "react-csv-downloader";
import utils from "../../../libs/utils/utils";
import CInput from "../../ui/CInput/CInput";
import CImage from "../../ui/CImage/CImage";
const TAG = "RESIDENT HISTORY";

type tableHistoryRowData = {
  index: number;
  user: string;
  access: string;
  comment: string;
  creationDate: string;
  idResident: string;
  validator: string;
  sector: string;
  officer: string;
  officerInfo: string;
  info: ResidentAccess;
};

type ResidentHistoryProps = {
  parms?: any;
};

const ResidentHistory: React.FC<ResidentHistoryProps> = ({ parms }) => {
  const screen = useScreenSize(true);
  const tableColumns = useMemo(
    () => [
      {
        Header: "Table",
        columns: [
          {
            id: "index",
            Header: "#",
            accessor: "index",
            width: 50,
            fieldType: "number",
          },
          {
            id: "user",
            Header: "Usuario",
            accessor: "user",
            fieldType: "text",
            minWidth: 100,
          },
          {
            id: "access",
            Header: "Acceso",
            accessor: "access",
            fieldType: "text",
            minWidth: 80,
          },
          {
            id: "sector",
            Header: "Sector",
            accessor: "sector",
            fieldType: "text",
            minWidth: 80,
          },
          {
            id: "creationDate",
            Header: "Fecha",
            accessor: "creationDate",
            fieldType: "text",
            width: 100,
          },
          {
            id: "officer",
            Header: "Guarda",
            accessor: "officer",
            width: 100,
            filter: "includes",
          },
          {
            id: "validator",
            Header: "Validador",
            accessor: "validator",
            width: 100,
            filter: "includes",
          },
          {
            id: "comment",
            Header: "Comentario",
            accessor: "comment",
            width: 100,
            filter: "includes",
          },
          {
            id: "officerInfo",
            Header: "Guarda Info",
            accessor: "officerInfo",
            width: 150,
            filter: "includes",
            Cell: (props: any) => {
              console.log(TAG, props);
              const idOfficer = props.row.original.officer;
              return (
                <Panel paddingX={10}>
                  <CButton
                    text={"Guarda"}
                    onPress={() => console.log(idOfficer)}
                  />
                </Panel>
              );
            },
          },
          {
            id: "validatorInfo",
            Header: "Validador Info",
            accessor: "validatorInfo",
            width: 180,
            filter: "includes",
            Cell: (props: any) => {
              console.log(TAG, props);
              const idOfficer = props.row.original.officer;
              return (
                <CButton
                  text={"Validador"}
                  onPress={() => console.log(idOfficer)}
                />
              );
            },
          },
          {
            id: "residentInfo",
            Header: "Usuario Info",
            accessor: "residentInfo",
            width: 180,
            filter: "includes",
            Cell: (props: any) => {
              console.log(TAG, props);
              const infoUser = props.row.original.residentInfo;
              return (
                <CButton
                  text={"Usuario"}
                  onPress={() => console.log(infoUser)}
                />
              );
            },
          },
        ],
      },
    ],
    []
  );

  const [tableData, setTableData] = useState<Array<tableHistoryRowData>>([]);
  const [tableDataState, setTableDataState] = useState(0);

  const [tableDownload, setTableDownload] = useState<Array<any>>([]);

  const [filterDates, setFilterDates] = useState({ min: "", max: "" });

  const resident = useMemo(() => {
    let newResi = new ResidentType("", null);

    if (parms instanceof ResidentType) {
      newResi = parms;
    } else if (typeof parms === "string") {
      newResi = new ResidentType("", null);
    }
    return newResi;
  }, [parms]);

  const homeGoTo = useSetHomeGoTo();
  const group = useCurrentGroup();
  const alert = useCustomAlert();

  useEffect(() => {
    if (group.isEmpty()) return;
    console.log(TAG, filterDates);
    const dmin = utils.dates.dateStringInputToDate(filterDates.min);
    const dmax = utils.dates.dateStringInputToDate(filterDates.max);
    Api.database.residents
      .getResidentAccessWithUserType(group, resident, 500, dmin, dmax)
      .then((result) => {
        const data: tableHistoryRowData[] = [];
        result.forEach((item, index) => {
          const access = item.access;
          data.push({
            index: index + 1,
            user: item.resident.name,
            access: access.exit ? "Salida" : "Entrada",
            sector: access.sector,
            creationDate: utils.dates.unixToString(access.creationDate, true),
            officer: "",
            officerInfo: "",
            validator: item.validator.name,
            comment: access.comment,
            idResident: access.idResident,
            info: access,
          });
        });
        setTableData(data);
        setTableDataState(1);
        const newData: Array<any> = data.map((item) => [
          item.index,
          item.access,
          item.sector,
          item.creationDate,
          item.validator,
          item.comment,
        ]);
        newData.push([
          "Detalles del usuario:",
          resident.name,
          resident.idCard,
          resident.phone,
          resident.profession,
          resident.profileImage,
        ]);
        setTableDownload(newData);
      })
      .catch((err) => {
        alert.info("Fallo obtener datos de accesos");
      });
  }, [group, resident, alert, filterDates]);

  const onRowClick = useCallback((row: tableHistoryRowData) => {
    console.log(TAG, row);
  }, []);

  const tableContainerStyles: React.CSSProperties = {
    overflowX: "scroll",
    maxWidth: screen.maxSize("xs") ? screen.winX - 30 : screen.winX - 100,
  };
  const DownLoadButton = useMemo(
    () => (
      <CsvDownloader
        filename={`${resident.name.replace(" ", "_")}_history_accessa`}
        extension=".csv"
        separator={"\t"}
        // wrapColumnChar="'"
        columns={tableColumns[0].columns.map((item) => ({
          id: item.id,
          displayName: item.Header,
        }))}
        datas={tableDownload}
        text="DOWNLOAD"
      >
        <CButton onPress={() => null} text="Descargar" />
      </CsvDownloader>
    ),
    [tableDownload, resident, tableColumns]
  );
  return (
    <Panel paddingX={10} paddingY={10} className="ResidentHistory">
      <Panel paddingY={20} paddingX={10} level="3">
        <Panel className="panelTitle" flexDirection="row" flex>
          {!resident.isEmpty() && (
            <>
              <Panel paddingX={10}>
                <CButton onPress={() => homeGoTo("search")} text="Atras" />
                {DownLoadButton}
              </Panel>

              <Panel flex level="5" height={110} paddingX={10}>
                <Panel verticalCenter>
                  {/* <img
                    src={resident.profileImage}
                    alt={`imagen de ${resident.name}`}
                    height={80}
                  /> */}
                  <CImage
                    src={resident.profileImage}
                    title={resident.name}
                    height={80}
                    preview
                  />
                </Panel>

                <Panel verticalCenter>
                  <CText paddingX={10} type="h5">
                    {resident.name}
                  </CText>
                </Panel>
              </Panel>
            </>
          )}
          {resident.isEmpty() && (
            <Panel width={200} paddingX={10}>
              {DownLoadButton}
            </Panel>
          )}
        </Panel>
        <Panel paddingX={10} flexDirection="row" flex={!screen.maxSize("xs")}>
          <CInput
            label="Fecha minima"
            // defaultValue={utils.dates.dateNow().toISOString().substr(0, 10)}
            onUpdate={(t) => setFilterDates({ ...filterDates, min: t })}
            type="date"
          />
          <CInput
            label="Fecha maxima"
            // defaultValue={utils.dates.dateNow().toISOString().substr(0, 10)}
            onUpdate={(t) => setFilterDates({ ...filterDates, max: t })}
            type="date"
          />
        </Panel>

        <Panel paddingY={10} style={tableContainerStyles}>
          <Panel totalHeight={230} overflow="scroll">
            <Table
              columns={tableColumns}
              data={tableData}
              isLoading={tableData.length === 0 && tableDataState === 0}
              emptyTableContent="Sin datos, intentalo despues de que ingrese el usuario."
              onRowClick={(e, row) => onRowClick(row.original)}
            />
          </Panel>
        </Panel>
      </Panel>
    </Panel>
  );
};
export default ResidentHistory;
