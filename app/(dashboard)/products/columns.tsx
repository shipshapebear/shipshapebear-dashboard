"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { UseProduct } from "@/context/ProductProvider"
import { products } from "@/drizzle/schema"
import { InferModel } from "drizzle-orm"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type ProductType = InferModel<typeof products>

export const columns: ColumnDef<ProductType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "id",
        accessorKey: "id",
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    className="text-left"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return row.getValue("title")
        }
    },


    {
        id: "description",
        accessorKey: "description",
    },
    {
        id: "price",
        accessorKey: "price",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original
            const { setProduct, setProductToDelete } = UseProduct()

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setProduct(product)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setProductToDelete(product.id)}>Delete product</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
