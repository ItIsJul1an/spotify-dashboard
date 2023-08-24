import React, {useEffect, useMemo, useState} from 'react'
import {
    CellContext,
    ColumnDef,
    createColumnHelper,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import {Album, Playlist, Track} from '../../../../data/data_types'
import useTracksStore from '../../../../stores/tracks/useTrackStore'
import Checkbox from '../../../form/checkbox/Checkbox'
import Numbering from '../../numbering/Numbering'
import BasicTableHeader from './table_parts/BasicTableHeader'
import BasicTableBody from './table_parts/BasicTableBody'
import BasicTableFooter from './table_parts/BasicTableFooter'

import './BasicTable.css'
import PlayButton from "../../../form/buttons/filled/playButton/PlayButton";
import FollowButton from "../../../form/buttons/outlined/followButton/FollowButton";
import KebabMenuButton from "../../../form/menu/kebab_menu/KebabMenuButton";
import dropdownContent from "../../../form/dropdown/DropdownContent";
import BasicTrackListDropdownContent from "../../../form/dropdown/basic_track_list/BasicTrackListDropdownContent";

interface BasicTableProps {
    data?: any
    dataType?: Track | Album | Playlist
}

const BasicTable = ({}: BasicTableProps) => {

    const {tracks} = useTracksStore()
    const slicedTracks = tracks.slice(0, 5)

    const [mountDropdown, setMountDropdown] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<string>('')
    const [selectedRow, setSelectedRow] = useState<number>(-1)
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [data, setData] = useState<Track[]>([...slicedTracks])

    useEffect(() => {
        setData(() => [...slicedTracks])
    }, [tracks])

    const columnHelper = createColumnHelper<Track>()

    const selectionColumn: ColumnDef<any, any> = (
        {
            id: 'select',
            header: () => (
                <Checkbox {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler()
                }}
                />
            ),
            cell: ({row}: CellContext<Track, string>) => (
                <Checkbox {...{
                    checked: row.getIsSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
                />
            ),
            enableSorting: false,
        }
    )

    const titleColumn: ColumnDef<any, any> = (
        columnHelper.accessor('name', {
            header: () => <h1>Title</h1>,
            cell: info => <div onClick={() => setSelectedRow(() => info.row.index)
            } style={{display: 'flex', alignItems: 'center', gap: '16px', width: 'fit-content'}}>
                <Numbering value={info.row.index + 1}/>
                <span className='fw--semi-bold clr-pr-1'>{info.getValue()}</span>
            </div>
        })
    )

    const trackColumns = useMemo<ColumnDef<any, any>[]>(() => [
        selectionColumn,
        titleColumn,
        columnHelper.accessor('artists', {
            header: () => <h1>Artist</h1>,
            cell: info => <span>{
                info.getValue().map((artist: { name: string }) => artist.name).join(', ')
            }</span>,
        }),
        columnHelper.accessor('duration_ms', {
            header: () => <h1>Time</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor('album.name', {
            header: () => <h1>Album</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        {
            id: 'action',
            cell: info =>
                <KebabMenuButton size='16'
                                 dropdownContent={<BasicTrackListDropdownContent track={info.row.original} setMountDropdown={setMountDropdown}/>}
                                 tooltipContent={`More Options for ${info.row.original.name} of 
                                 ${info.row.original.artists
                                     .map((artist: { name: string }) => artist.name)
                                     .join(', ')}`}
                                 mountDropdown={mountDropdown} setMountDropdown={setMountDropdown}/>
        }
    ], [mountDropdown])

    const columns: ColumnDef<any, any>[] = trackColumns

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            rowSelection
        },
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <table id='basic-table'>
            <BasicTableHeader table={table}/>
            <BasicTableBody table={table} columns={columns}/>
            <BasicTableFooter table={table} columns={columns}/>
        </table>
    )
}

export default BasicTable