"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import ProductDrawer from "./product-drawer"
import { UseProduct } from "@/context/ProductProvider"
import { handleDeleteIds, handleDeleteId} from "@/app/actions"
import { useRouter } from "next/navigation"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { toast } from "@/lib/utils/useToast"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})

    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const { setAction, productToDelete, setProductToDelete } = UseProduct()
    const route = useRouter()
    const { rows } = table.getFilteredSelectedRowModel()
    const selectedRows = rows.map((row) => row.original.id)
    const [deleteConfirmatioOpen, setDeleteConfirmationOpen] = React.useState(false)
    const handleMultipleDelete = async () => {
        setDeleteConfirmationOpen(false)
        await handleDeleteIds(selectedRows)
        table.toggleAllPageRowsSelected(false)
        route.refresh()

        toast({
            variant: "success",
            title: "Successfully deleted rows.",
        })
    }
    const handleDelete = async () => {
        setProductToDelete(null)
        await handleDeleteId(productToDelete as number)
        route.refresh()

        toast({
            variant: "success",
            title: "Successfully deleted row.",
        })
    }

    return (
        <div>
            <div className="flex items-center gap-x-2 py-4">
                <Input
                    placeholder="Filter title..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Actions
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setAction("ADD")}>
                            Add product
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={selectedRows.length === 0} onClick={() => setDeleteConfirmationOpen(true)}>
                            Delete selected
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Columns</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                D
                                {table
                                    .getAllColumns()
                                    .filter(
                                        (column) => column.getCanHide()
                                    )
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <ProductDrawer />
            <AlertDialog open={deleteConfirmatioOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the selected rows.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteConfirmationOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleMultipleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {
                productToDelete && <AlertDialog open={!!productToDelete}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the row.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeleteConfirmationOpen(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            }
            <DataTablePagination table={table} />
        </div>
    )
}
