import { useFilters, useTable } from "react-table";
import React, { useMemo } from 'react';

export default function Table(props) {
    const columns = useMemo(() => props.columns, [props.columns])
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
        //   console.log(data)
        return (
          <div
            onClick={() => {
              data.column.setFilter(["Casey", "Sheff"]);
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
    } = useTable({
        defaultColumn:FILTER_COLUMN_CONFIG,
        data: data,
        columns: columns,
        filterTypes
    },useFilters)
    return (
        <React.Fragment>
            {state.filters && state.filters.length>0 && <ShowFilters/>}
            
        <table {...getTableProps} style={{ width: "100%" }}>
            {console.log(state)}
            <thead>
                {headerGroups.map(headerGroup =>
                    <tr {...headerGroup.getHeaderGroupProps}>
                        {headerGroup.headers.map(header =>
                            <th {...header.getHeaderProps}>{header.render('Header')}&nbsp;{header.isFilterEnabled && header.render('Filter')}</th>
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

const ShowFilters = () => {
    return <div>Filters Applicable</div>
}
