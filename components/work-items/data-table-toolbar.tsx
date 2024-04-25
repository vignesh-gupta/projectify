"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { priorities, statuses } from "./options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  // const [userList, setUserList] = useState<TOptions | null>(null);
  const isFiltered = table.getState().columnFilters.length > 0;

  // const { organization } = useOrganization();
  // const orgUsers = useQuery(api.users.list, {
  //   teamId: organization?.id as string,
  // });

  // useEffect(() => {
  //   let users = (orgUsers || []).map((user) => ({
  //     label: user?.firstName as string,
  //     value: user?._id as string,
  //   }));

  //   users.push({ label: "Unassigned", value: "unassigned" });

  //   setUserList(users);
  // }, [orgUsers]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {/* {table.getColumn("assignee") && (
          <DataTableFacetedFilter
            column={table.getColumn("assignee")}
            title="Assignee"
            options={userList || []}
          />
        )} */}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
