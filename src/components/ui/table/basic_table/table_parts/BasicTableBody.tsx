import React from 'react'

import {ColumnDef, flexRender, Table} from '@tanstack/react-table'

interface BasicTableBodyProps {
    table: Table<any>
    columns: ColumnDef<any, any>[]
}

const BasicTableBody = ({table, columns}: BasicTableBodyProps) => {

    return (
        <tbody id='basic-table--body'>

        {/* Trick so that the header with the menu button is between the thead and the tbody with some margin,
                    but it spans over all the columns, so that the menu button will be on the right outer side and the
                    heading on the left outer side */}
        <tr>
            <td colSpan={columns.length} style={{borderRadius: 'var(--br-r-medium) var(--br-r-medium) 0 0'}}>
                Tracks
            </td>
        </tr>

        {
            table.getPageCount() === 0 ? <tr>
                    <td colSpan={columns.length}>
                        <span className='fw--semi-bold clr-pr-1'>No entries available!</span>
                    </td>
                </tr> :
                /* Display the row/cell content */
                table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {
                            row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {
                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                    }
                                </td>
                            ))
                        }
                    </tr>
                ))
        }
        </tbody>
    )
}

export default BasicTableBody