'use client'

import * as React from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    ColumnFiltersState,
    getFilteredRowModel,
} from '@tanstack/react-table'
import { ArrowUpDown, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

interface ScheduleItem {
    id: number
    title: string
    platform: string
    scheduledDate: string
    scheduledTime: string
    status: 'draft' | 'scheduled' | 'published'
    aiTips: string[]
}

interface ScheduleDataTableProps {
    data: ScheduleItem[]
    onEdit: (item: ScheduleItem) => void
}

export function ScheduleDataTable({ data, onEdit }: ScheduleDataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const columns: ColumnDef<ScheduleItem>[] = [
        {
            accessorKey: 'title',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="hover:bg-black/5 h-auto p-0 text-sm font-bold"
                    >
                        Title
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="font-medium text-sm">{row.getValue('title')}</div>
            ),
        },
        {
            accessorKey: 'platform',
            header: 'Platform',
            cell: ({ row }) => (
                <div className="capitalize text-sm">{row.getValue('platform')}</div>
            ),
        },
        {
            accessorKey: 'scheduledDate',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="hover:bg-black/5 h-auto p-0 text-sm font-bold"
                    >
                        Date
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue('scheduledDate'))
                return <div className="text-sm">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            },
        },
        {
            accessorKey: 'scheduledTime',
            header: 'Time',
            cell: ({ row }) => <div className="text-sm">{row.getValue('scheduledTime')}</div>,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.getValue('status') as string
                const statusColors = {
                    draft: 'bg-yellow-100 text-yellow-800 border-yellow-800',
                    scheduled: 'bg-blue-100 text-blue-800 border-blue-800',
                    published: 'bg-green-100 text-green-800 border-green-800',
                }
                return (
                    <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium border-2 ${statusColors[status as keyof typeof statusColors]}`}
                    >
                        {status}
                    </span>
                )
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            size: 100,
            cell: ({ row }) => {
                const item = row.original
                return (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(item)}
                        className="hover:bg-black hover:text-custom-green h-8 text-xs px-3"
                    >
                        <Edit2 className="h-3 w-3 mr-1" />
                        Edit
                    </Button>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    })

    return (
        <div className="w-full">
            {/* Filter Input */}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by title..."
                    value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('title')?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm border-2 border-black text-sm h-10"
                />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-md border-2 border-black shadow-box bg-white">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-b-2 border-black bg-custom-green/30">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="font-bold text-black text-sm h-12 px-6">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className="border-b border-black/20 hover:bg-custom-green/20"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="h-14 py-2 px-6">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-sm"
                                >
                                    No scheduled posts found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-black/60">
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                    {Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length
                    )}{' '}
                    of {table.getFilteredRowModel().rows.length} posts
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="border-2 border-black hover:bg-black hover:text-custom-green h-9 text-sm px-4"
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </span>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="border-2 border-black hover:bg-black hover:text-custom-green h-9 text-sm px-4"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
