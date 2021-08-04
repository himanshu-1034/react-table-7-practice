import React from 'react';
import MOCK_DATA from './MOCK_DATA.json'
import Table from './Table';
export default function App() {

    let Columns = [
        {
            Header:"ID",
            accessor:"id",
            isFilterEnabled:true,
            Filter: MyFilter
        },
        {
            Header:"FIRST NAME",
            accessor:"first_name",
        
        },
        {
            Header:"EMAIL",
            accessor:"email",
            isFilterEnabled:true,
        },
    ]
  return (
    <>
        <Table columns={Columns} data={MOCK_DATA}/>
    </>
  );
}


const MyFilter = ({column}) => {
    return <div onClick={()=> column.setFilter([3,8])}>Helllllllllllo</div>
}