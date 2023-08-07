"use client"
import React from 'react'
import { DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, Drawer, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

const ProductDrawer = () => {
    return (
        <Drawer defaultOpen={true}>
            <DrawerContent className="sm:max-w-[425px]" title="test">
                <DrawerHeader title="Edit Profile" />
                <div className="flex-1 overflow-y-auto p-6">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum quod voluptate minus sequi, quasi necessitatibus maiores, nulla voluptatem voluptates vel eligendi tenetur odit reprehenderit vero aliquid saepe excepturi dolore iste ipsum deserunt cum aspernatur? Tenetur corporis, laborum dolores natus enim cum aliquam earum perspiciatis tempore reprehenderit in beatae deleniti, iure a, perferendis qui repellat praesentium error odio? Dolores dolore quaerat excepturi deleniti neque laborum praesentium fuga, autem aliquam qui doloribus aliquid consectetur accusamus illum, deserunt suscipit ea quisquam consequuntur ex dolor, nostrum omnis? Debitis, perspiciatis? Ipsa maxime harum quibusdam dolore possimus ipsum optio ut nesciunt, mollitia ea, officiis cupiditate quas doloribus velit libero minus deleniti eaque eligendi omnis cumque? Dolorum qui omnis quas libero, ratione sapiente quisquam itaque quae, placeat quasi totam soluta non, similique illo harum tempora nemo eveniet aliquam deleniti exercitationem adipisci facere molestias. Quae dolor aliquid quam hic incidunt ea sequi dolores fugit eius quas, fuga eaque, recusandae qui. Voluptatem illo minus excepturi necessitatibus commodi consequatur, provident asperiores doloremque vero facilis officiis cupiditate enim autem. Voluptas assumenda nemo quam quidem eligendi, minus fuga odio tempore adipisci pariatur a veritatis amet, ad natus ratione. Est, quidem consectetur odit esse minima sapiente ratione iure porro dolores repellendus suscipit! Ab voluptate quas veritatis. Natus labore quos aperiam omnis ullam, delectus explicabo odio ducimus sed, accusamus quis accusantium. Cum, reprehenderit quibusdam inventore totam facilis perspiciatis laudantium voluptas harum pariatur obcaecati in incidunt. Laboriosam fuga deleniti deserunt neque explicabo numquam, id praesentium ipsa amet aut sint. Soluta saepe eligendi quia animi eius?
                </div>
                <DrawerFooter>
                    <Button variant="outline" size="sm">Test Button</Button>
                    <Button variant="secondary" size="sm">Test Button</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ProductDrawer