"use client"

import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/lib/utils/useToast"
import { CheckCircle2, XCircle } from "lucide-react"


export function Toaster() {
    const { toasts } = useToast()

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, action, ...props }) {

                return (
                    <Toast key={id} {...props}>
                        <div className="flex items-center gap-x-2">
                            {props.variant && props.variant === "success" ? <CheckCircle2/> : "destructive" ? <XCircle /> : <></>}
                            <div className="grid gap-1">
                                {title && <ToastTitle>{title}</ToastTitle>}
                                {description && (
                                    <ToastDescription>{description}</ToastDescription>
                                )}
                            </div>
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                )
            })}
            <ToastViewport />
        </ToastProvider>
    )
}