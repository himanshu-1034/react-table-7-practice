import { useBlockLayout, useFilters, useResizeColumns, useTable } from "react-table";
import React, { useEffect, useMemo, useState } from 'react';

export default function Table(props) {
    const tableColumns = useMemo(() => props.columns, [props.columns])
    const data = useMemo(() => props.data, [props.data])

    const FILTER_COLUMN_CONFIG = {
        filter: (rows, columnID, filterValue) => {
          return rows.filter(row => {
            const rowValue = row.values[columnID];
            return filterValue.includes(rowValue);
          });
        },
        Filter: SelectColumnFilter
      };

      function SelectColumnFilter(data) {
          // console.log(data)
        return (
          <div
            onClick={() => {
              data.column.setFilter(["swyman7@dot.gov"]);
            }}
          >
            Filter me
          </div>
        );
      }

      const filterTypes = React.useMemo(
        () => ({
          text: (rows, id, filterValue) => {
            return rows.filter(row => {
              const rowValue = row.values[id];
              return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true;
            });
          }
        }),
        []
      );

    const {
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
        headerGroups,
        state,
        setAllFilters,
        allColumns
    } = useTable({
        defaultColumn:FILTER_COLUMN_CONFIG,
        data: data,
        columns: tableColumns,
        filterTypes,
    },useFilters,useResizeColumns,useBlockLayout)
    return (
        <React.Fragment>
            {state.filters && state.filters.length>0 && <ShowAppliedFilters state={state} setAllFilters={setAllFilters} allColumns={allColumns}/>}
            
        <table {...getTableProps} >
            {console.log(state)}
            <thead>
                {headerGroups.map(headerGroup =>
                    <tr {...headerGroup.getHeaderGroupProps}>
                        {headerGroup.headers.map(header =>
                            <th {...header.getHeaderProps}>{header.render('Header')}&nbsp;{header.isFilterEnabled && (header.render('Filter'))}
                            {header.isResizable && (
                  <div
                    {...header.getResizerProps()}
                  >R</div>
                )}
                            </th>
                        )}
                    </tr>
                )}
            </thead>
            <tbody {...getTableBodyProps}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps}>
                            {row.cells.map(cell =>
                                <td {...cell.getCellProps}>{cell.render('Cell')}</td>
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </React.Fragment>
    );
}

const ShowAppliedFilters = (props) => {
    const [filtersToDisplay,setFiltersToDisplay] = useState([])
    useEffect(()=>{
      if(props.state && props.state.filters) {
        setFiltersToDisplay(props.state.filters)
      }
    },[props.state])
    
    const removeAppliedFilter = (event) => {
      // console.log(event.target.id,event.target.innerText)
      let filterId = event.target.id;
      let filterValue = event.target.innerText;
      let allFiltersArr = filtersToDisplay
      allFiltersArr.forEach(filter => {
        if(filter.id===filterId) {
          let updatedValuesArray = filter.value.filter(val => val.toString()!==filterValue.toString())
            filter.value = updatedValuesArray
        }
      })
      let newFilters = allFiltersArr.filter(val => val.value.length!==0)
      props.setAllFilters(newFilters)
    }

    return <div>
      {
        filtersToDisplay.map((filter) => {
          return <div>
            <span>{props.allColumns.find(col => col.id===filter.id).Header}:</span>
            <ul>
              {filter.value.map(filterVal => {
                return <li key={filterVal} id={filter.id} onClick={(e) => removeAppliedFilter(e)}>{filterVal}</li>
              })}
            </ul>
          </div>
        })
      }
    </div>
}
