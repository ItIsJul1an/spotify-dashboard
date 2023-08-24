import React from 'react'

import {ColumnDef, Table} from '@tanstack/react-table'

interface BasicTableFooterProps {
    table: Table<any>
    columns: ColumnDef<any, any>[]
}

const BasicTableFooter = ({table, columns}: BasicTableFooterProps) => {

    return (
        <tfoot id='basic-table--footer'>
        <tr>
            <td colSpan={columns.length}>
                {
                    table.getPageCount() === 0 ? null :
                        <span className='fs-sc-body-1'>
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </span>
                }
            </td>
        </tr>
        </tfoot>
    )
}

export default BasicTableFooter