"use client"
import React, { useEffect } from 'react'
import { DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, Drawer, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/text-area'
import { toast } from '@/lib/utils/useToast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { handleUpdate, handleAdd } from '@/app/actions'
import { UseProduct } from '@/context/ProductProvider'
import { useRouter } from 'next/navigation'

const productFormSchema = z.object({
    title: z
        .string(),
    price: z.string({ required_error: "Please input price" }),
    description: z.string({
        required_error: "Please select a language.",
    }).max(500, {
        message: "Name must not be longer than 300 characters.",
    }),
})

type ProductFormValues = z.infer<typeof productFormSchema>


const ProductDrawer = () => {
    const { setProduct, product, action, setAction } = UseProduct()
    const route = useRouter()

    //setting default values || thsi does not work when product is from useState
    const defaultValues: Partial<ProductFormValues> = {
        // title: null,
        // price: null,
        // description: null,
    }
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        mode: "onSubmit"
        // defaultValues,
    })

    const editFunction = (data: any) => {
        handleUpdate(product?.id, data)

        toast({
            variant: "success",
            title: "Update successful.",
        })

        route.refresh()
    }

    const addFunction = (data: any) => {
        handleAdd(data)

        toast({
            variant: "success",
            title: "Added successfully.",
        })

        route.refresh()
    }

    async function onSubmit(data: ProductFormValues) {
        const actionFunction = () => action === "ADD" ? addFunction(data) : editFunction(data)
        actionFunction()
    }


    useEffect(() => {
        if (action === "ADD") return
        form.setValue("title", product?.title as string ?? undefined)
        form.setValue("price", product?.price as string ?? undefined)
        form.setValue("description", product?.description as string ?? undefined)
    }, [product, form, action])


    return (
        <Drawer open={!!product || action} onOpenChange={() => {
            setProduct()
            setAction()
        }}>
            <DrawerContent className="sm:max-w-[425px]">
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex h-screen flex-col'>
                    <DrawerHeader title={`${action === "ADD" ? "Add Product" : "Edit Product"}`} />
                    <div className="flex-1 space-y-3 overflow-y-auto p-6">
                        <Form {...form}>
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
                        </Form>
                    </div>
                    <DrawerFooter>
                        <Button variant="outline" type="button" size="sm" onClick={() => {
                            setProduct(null)
                            setAction(null)
                        }}>Close</Button>
                        <Button size="sm" type='submit'>Save</Button>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer >
    )
}

export default ProductDrawer