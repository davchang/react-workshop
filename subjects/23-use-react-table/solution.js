import React from "react";
import ReactDOM from "react-dom";
import ReactTable from 'react-table'
// import 'react-table/react-table.css'
import ViewTable from './ViewTableNew'

const data = [{
  upliftLoad: "4301",
  loadType: "Wind",
  designCode: "IBC 2015",
  holdownType: "Embedded Anchor",
  lumberSpecies: "DF"
}]

const columns = [{
  accessor: 'upliftLoad',
  Header: 'Uplift Load (lbs)'
}, {
  accessor: 'loadType',
  Header: 'Load Type'
}, {
  accessor: 'designCode',
  Header: 'Design Code'
}, {
  accessor: 'holdownType',
  Header: 'Holdown Type'
}, {
  accessor: 'lumberSpecies',
  Header: 'Lumber Species'
}]

const columnsSummary = [{
  accessor: 'pdfSummary',
  Header: 'PDF Summary'
}, {
  accessor: 'holdownPostInstalled.holdownModel',
  Header: 'Holdown Model'
}, {
  accessor: 'holdownPostInstalled.holdownCapacity',
  Header: 'Holdown Capacity (lbs)'
}, {
  accessor: 'holdownPostInstalled.deflection',
  Header: 'Deflection at Demand Load (in)'
}, {
  accessor: 'holdownPostInstalled.postSize',
  Header: 'Post Size (min)'
}, {
  accessor: 'holdownPostInstalled.holdownRequiredFasteners',
  Header: 'Holdown Required Fasteners'
}, {
  accessor: 'holdownPostInstalled.anchorDiameter',
  Header: 'Anchor Diameter (in)'
}, {
  accessor: 'holdownPostInstalled.installedCostIndex',
  Header: 'Installed Cost Index'
}]

const dataSummary = [{
  pdfSummary: "YmyPDF1A-1XXXX",
  holdownPostInstalled: {
    holdownModel: "HDU-SDS2.5",
    holdownCapacity: 4565,
    deflection: 0.107,
    postSize: "4x4",
    holdownRequiredFasteners: "(10) SDS 1/4\" x 2 1/2",
    anchorDiameter: "5/8",
    installedCostIndex: "+28%"
  }
}, {
  pdfSummary: "myPDF1A-1YYYY",
  holdownPostInstalled: {
    holdownModel: "HDU-SDS2.5",
    holdownCapacity: 456588,
    deflection: 0.107,
    postSize: "4x4",
    holdownRequiredFasteners: "(10) SDS 1/4\" x 2 1/2",
    anchorDiameter: "5/8",
    installedCostIndex: "+28%"
  }
}, {
  pdfSummary: "myPDF1A-1",
  holdownPostInstalled: {
    holdownModel: "HDU-SDS2.5",
    holdownCapacity: 456599,
    deflection: 0.107,
    postSize: "Y4x4",
    holdownRequiredFasteners: "(20) SDS 1/4\" x 2 1/2",
    anchorDiameter: "5/8",
    installedCostIndex: "+28%"
  }
}]

function TableView() {

  return (
    <>
{/*
      <br/><br/>
      <ReactTable
        data={data}
        columns={columns}
        pageSize={3}
      />
*/}
      <br/><br/>

      <ViewTable
        data={dataSummary}
        columns={columnsSummary}
        pageSize={5}
        sortable={true}
        filterable={true}
      />
    </>
  )
}

ReactDOM.render(<TableView />, document.getElementById("app"));
