"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useEffect, useState } from "react";
import { DASHBOARD_ROUTE } from "../constants";

export const useWorkItemTable = <TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  data: TData[]
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Update URL query params when columnFilters change
  useEffect(() => {
    const filters = {
      status: columnFilters.find((filter) => filter.id === "status")?.value,
      assignee: columnFilters.find((filter) => filter.id === "assignee")?.value,
      priority: columnFilters.find((filter) => filter.id === "priority")?.value,
    };

    const query = qs.stringify(filters, {
      skipEmptyString: true,
      skipNull: true,
    });

    if (query) router.push(`?${query}`);
  }, [columnFilters, router]);

  // Update columnFilters on initial load
  useEffect(() => {
    const query = qs.parse(searchParams.toString());

    const newColumnFilters: ColumnFiltersState = Object.entries(query).map(
      ([key, value]) => ({
        id: key,
        value: typeof value === "string" ? [value] : value,
      })
    );


    setColumnFilters(newColumnFilters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return table;
};
