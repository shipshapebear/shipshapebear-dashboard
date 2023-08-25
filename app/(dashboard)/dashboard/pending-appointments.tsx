import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const appointments = [
    {
        id: "1",
        name: "Juan Dela Cruz",
        contactNumber: "+63 912 3455 467",
        status: "Confirmed",
    },
    {
        id: "2",
        name: "Juan Dela Cruz",
        contactNumber: "+63 912 3455 467",
        status: "Confirmed",
    },
    {
        id: "3",
        name: "Juan Dela Cruz",
        contactNumber: "+63 912 3455 467",
        status: "Confirmed",
    },
    {
        id: "4",
        name: "Juan Dela Cruz",
        contactNumber: "+63 912 3455 467",
        status: "Confirmed",
    },
    {
        id: "5",
        name: "Juan Dela Cruz",
        contactNumber: "+63 912 3455 467",
        status: "Confirmed",
    },

]

export function PendingAppointments() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                        <TableCell className="font-medium p-2">{appointment.id}</TableCell>
                        <TableCell className="p-2">{appointment.name}</TableCell>
                        <TableCell className="p-2"><Button size="sm" className="h-[24px]">View</Button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}