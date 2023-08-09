"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from '@/lib/utils/useToast'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/text-area'
import { Card } from '@/components/ui/card'
import { handleUpdate } from '@/app/actions'
import { DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, Drawer, DrawerTrigger } from '@/components/ui/drawer'
const productFormSchema = z.object({
    title: z
        .string(),
    price: z.string(),
    description: z.string({
        required_error: "Please select a language.",
    }).max(500, {
        message: "Name must not be longer than 300 characters.",
    }),
})

type ProductFormValues = z.infer<typeof productFormSchema>


const ProductForm = ({ product }) => {
    const defaultValues: Partial<ProductFormValues> = {
        title: product.title,
        price: product.price,
        description: product.description
    }
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues,
        mode: 'onChange',
    })
    async function onSubmit(data: ProductFormValues) {

        handleUpdate(product.id, data)

        toast({
            title: "Update successful.",
            description: `Item ${product.id} updated successfully.`
        })
    }


    return (
        <>
            <h1 className='mb-4 text-2xl font-bold capitalize text-foreground'>Update Product {process.env.NODE_ENV}</h1>
            <Card className='max-w-lg p-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='mt-4'>Update</Button>
                    </form>
                </Form>
            </Card>
        </>
    )
}

export default ProductForm