import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Doc } from "@/convex/_generated/dataModel";
import TaskPriority from "@/components/task/task-priority";
import TaskStatus from "@/components/task/task-status";
import TaskTitle from "@/components/task/task-title";

type OwnedTaskTableProps = {
  tasks: Doc<"workItems">[];
};

const OwnedTaskTable = ({ tasks }: OwnedTaskTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="md:min-w-64">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task._id}>
            <TableCell className="truncate max-w-[300px]">
              <TaskTitle title={task.title} type={task.label} />
            </TableCell>
            <TableCell>
              <TaskStatus status={task.status} />
            </TableCell>
            <TableCell>
              <TaskPriority priority={task.priority} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OwnedTaskTable;
