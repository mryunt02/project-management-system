// ... existing imports ...
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
export function AttendeesTable({ attendees }: { attendees: string[] }) {
  return (
    <Table>
      <TableCaption>A list of event attendees.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendees.map((attendee) => (
          <TableRow key={attendee}>
            <TableCell className='font-medium'>{attendee}</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={1}>Total Attendees</TableCell>
          <TableCell className='text-right'>{attendees.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
