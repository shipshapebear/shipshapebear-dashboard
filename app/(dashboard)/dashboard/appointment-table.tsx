import { Badge } from "@/components/ui/badge"
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
        id: "INV001",
        name: "Juan Dela Cruz",
        contactNumber: "+63 912 3455 467",
        status: "Confirmed",
    },
    {
        id: "INV002",
        name: "Juan Dela Cruz",
        contactNumber: "+63 912 3455 467",
        status: "Confirmed",
    },
    {
        id: "INV003",
        name: "Juan Dela Cruz",
        contactNumber: "+63 912 3455 467",
        status: "Confirmed",
    },
    {
        id: "INV004",
        name: "Juan Dela Cruz",
        contactNumber: "+63 912 3455 467",
        status: "Confirmed",
    },
    {
        id: "INV005",
        name: "Juan Dela Cruz",
        contactNumber: "+63 912 3455 467",
        status: "Confirmed",
    },
    {
        id: "INV006",
        name: "Juan Dela Cruz",
        contactNumber: "+63 912 3455 467",
        status: "Confirmed",
    },
    {
        id: "INV007",
        name: "Juan Dela Cruz",
        contactNumber: "+63 912 3455 467",
        status: "Confirmed",
    },
]

export function AppointmentTable() {
    return (
        <Table>
            <TableCaption>A list of appointments today.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center w-[100px]">ID</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Contact Number</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                        <TableCell className="text-center font-medium">{appointment.id}</TableCell>
                        <TableCell className="text-center">{appointment.name}</TableCell>
                        <TableCell className="text-center">{appointment.contactNumber}</TableCell>
                        <TableCell className="text-center"><Badge variant="confirmed">{appointment.status}</Badge></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}