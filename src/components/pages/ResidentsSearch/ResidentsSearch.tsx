import "./ResidentsSearch.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Panel from "../../ui/Panel/Panel";
import CInput from "../../ui/CInput/CInput";
import { Table } from "@itwin/itwinui-react";
import { useScreenSize } from "../../hooks/windowResize";
import Api from "../../../api/Api";
import { useCurrentGroup } from "../../hooks/currentGroup";
import ResidentType from "../../../types/ResidentType";
import { useHomeGoTo, useSetHomeGoTo } from "../../hooks/useHomeGoTo";
import CText from "../../ui/CText/CText";
const TAG = "RESIDENTS SEARCH";
type tableRowData = {
  index: number;
  name: string;
  document: string;
  visitor: string;
  profession: string;
  info: ResidentType;
};
type ResidentsSearchProps = {};
const ResidentsSearch: React.FC<ResidentsSearchProps> = ({}) => {
  console.log(TAG, "render");
  const screen = useScreenSize(true);
  type TableStoryDataType = {
    index: number;
    name: string;
    description: string;
    ids: number[];
    startDate: Date;
    endDate: string;
  };

  const translatedLabels = useMemo(
    () => ({
      filter: "Filter",
      clear: "Clear",
      from: "From",
      to: "To",
    }),
    []
  );

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
            // Filter: tableFilters.NumberRangeFilter(translatedLabels),
          },
          {
            id: "name",
            Header: "Name",
            accessor: "name",
            fieldType: "text",
            minWidth: 100,
          },
          {
            id: "document",
            Header: "Documento",
            accessor: "document",
            fieldType: "text",
            width: 100,
          },
          {
            id: "profession",
            Header: "Profesión ",
            accessor: "profession",
            width: 100,
            filter: "includes",
          },
          {
            id: "visitor",
            Header: "Visitante",
            accessor: "visitor",
            filter: "includes",
            width: 100,
          },
        ],
      },
    ],
    []
  );

  const [tableData, setTableData] = useState<Array<tableRowData>>([]);
  const [tableDataState, setTableDataState] = useState(0);
  const [originalTableData, originalSetTableData] = useState<
    Array<tableRowData>
  >([]);

  const group = useCurrentGroup();
  useEffect(() => {
    if (group.isEmpty()) return;
    Api.database.residents
      .getResidents(group)
      .then((data) => {
        console.log(TAG, data);
        const newData: tableRowData[] = data.map((r, index) => {
          const row: tableRowData = {
            index: index + 1,
            name: r.name,
            document: r.idCard,
            visitor: r.isVisitor ? "Si" : "No",
            profession: r.profession!,
            info: r,
          };
          return row;
        });
        setTableData(newData);
        originalSetTableData(newData);
        setTableDataState(1);
      })
      .catch((err) => {});
  }, [group]);

  const filterRows = useCallback(
    (t: string) => {
      const text = t.toLowerCase();
      setTableData(
        originalTableData.filter((row) => {
          if (text === "") return true;
          if (row.name.toLocaleLowerCase().includes(text)) return true;
          if (row.document.toLocaleLowerCase().includes(text)) return true;
          if (row.profession.toLocaleLowerCase().includes(text)) return true;
          return false;
        })
      );
    },
    [originalTableData]
  );

  const homeGoTo = useSetHomeGoTo();

  const onRowClick = useCallback(
    (row: tableRowData) => {
      console.log(TAG, row);
      homeGoTo("history", row.info);
    },
    [homeGoTo]
  );
  const tableContainerStyles: React.CSSProperties = {
    overflowX: "scroll",
    maxWidth: screen.winX - 20,
  };

  return (
    <Panel paddingX={10} paddingY={10} className="ResidentsSearch">
      <Panel flex paddingX={10} paddingY={10}>
        <CText>Usuarios en: </CText>
        <CText type="h6" paddingX={10}>
          {group.name} {`(@${group.at})`}
        </CText>
      </Panel>

      <CInput placeHolder="Buscar..." onUpdate={(t) => filterRows(t)} />
      <Panel paddingY={10} style={tableContainerStyles}>
        <Panel totalHeight={200} overflow="scroll">
          <Table
            columns={tableColumns}
            data={tableData}
            isLoading={tableData.length === 0 && tableDataState === 0}
            emptyTableContent="No se encontraron datos."
            onRowClick={(e, row) => onRowClick(row.original)}
          />
        </Panel>
      </Panel>
    </Panel>
  );
};
export default ResidentsSearch;
