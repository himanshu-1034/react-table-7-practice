import React from 'react';
import MOCK_DATA from './MOCK_DATA.json'
import Table from './Table';
export default function App() {

    let Columns = [
        {
            Header:"ID",
            accessor:"id",
        },
        {
            Header:"FIRST NAME",
            accessor:"first_name",
        
        },
        {
            Header:"EMAIL",
            accessor:"email"
        },
    ]
  return (
    <>
        <Table columns={Columns} data={MOCK_DATA}/>
    </>
  );
}

