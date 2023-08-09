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
import { handleUpdate } from '@/app/actions'
import { UseProduct } from '@/context/ProductProvider'


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



const ProductDrawer = () => {
    const { setProduct, product } = UseProduct()

    //setting default values || thsi does not work when product is from useState
    // const defaultValues: Partial<ProductFormValues> = {
    //     title: product?.title as string,
    //     price: product?.price as string,
    //     description: product?.description as string
    // }
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        // defaultValues,
    })
    async function onSubmit(data: ProductFormValues) {

        handleUpdate(product?.id, data)

        toast({
            title: "Update successful.",
            description: `Item ${product.id} updated successfully.`
        })
    }

    useEffect(() => {
        form.setValue("title", product?.title as string)
        form.setValue("price", product?.price as string)
        form.setValue("description", product?.description as string)
    }, [product, form])

    return (
        <Drawer open={!!product} onOpenChange={setProduct}>
            <DrawerContent className="sm:max-w-[425px]">
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex h-screen flex-col'>
                    <DrawerHeader title="Edit Profile" />
                    <div className="flex-1 overflow-y-auto p-6">
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
                        <Button variant="outline" type="button" size="sm" onClick={() => setProduct(null)}>Close</Button>
                        <Button size="sm" type='submit'>Save Changes</Button>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer >
    )
}

export default ProductDrawer