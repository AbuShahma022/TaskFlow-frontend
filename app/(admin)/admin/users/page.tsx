"use client";
import { useState } from "react";

import { useAdminUsers } from "@/hooks/queries/use-admin-users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserCard } from "@/components/admin/user-card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateAdminUserStatus } from "@/hooks/mutations/use-update-admin-user-status";
import ReactPaginate from "react-paginate";

export default function AdminUsersPage() {
    const updateStatusMutation = useUpdateAdminUserStatus();
    const [page, setPage] = useState(1);
    const limit = 5;
  const { data, isLoading, isError } = useAdminUsers({
    page,
    limit,
  });

  if (isLoading) {
    return (
      <main className="p-6">
        <p className="text-sm text-muted-foreground">
          Loading users...
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-6">
        <p className="text-sm text-destructive">
          Failed to load users.
        </p>
      </main>
    );
  }

  const users = data?.data ?? [];

  return (
    <main className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold">Users</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage TaskFlow platform users.
        </p>
      </div>

      <div>
        <p className="mb-3 text-sm text-muted-foreground">
          Total users: {data?.meta.total ?? 0}
        </p>

        {/* Desktop */}
        <div className="hidden rounded-lg border md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>{user.role}</TableCell>

                  <TableCell>{user.status}</TableCell>

                  <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>

                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={
                        user.status === "ACTIVE" ? "destructive" : "default"
                      }
                      size="sm"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          userId: user.id,
                          payload: {
                            status:
                              user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE",
                          },
                        })
                      }
                      disabled={updateStatusMutation.isPending}
                    >
                      {updateStatusMutation.isPending ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Updating...
                        </>
                      ) : user.status === "ACTIVE" ? (
                        "Block"
                      ) : (
                        "Activate"
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
         { (data?.meta.totalPages ?? 0) > 1 && (
            <div className="flex justify-center pt-4">
              <ReactPaginate
                pageCount={data?.meta.totalPages ?? 0}
                forcePage={page - 1}
                onPageChange={(selectedItem) => {
                  setPage(selectedItem.selected + 1)
                }}
                previousLabel="Previous"
                nextLabel="Next"
                breakLabel="..."
                containerClassName="flex items-center gap-2"
                pageClassName="flex"
                pageLinkClassName="flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-md border px-3 text-sm hover:bg-muted"
                activeLinkClassName="bg-primary text-primary-foreground hover:bg-primary"
                previousClassName="flex"
                previousLinkClassName="flex h-9 items-center cursor-pointer justify-center rounded-md border px-3 text-sm hover:bg-muted"
                nextClassName="flex"
                nextLinkClassName="flex h-9 items-center cursor-pointer justify-center rounded-md border px-3 text-sm hover:bg-muted"
                breakClassName="flex"
                breakLinkClassName="flex h-9 min-w-9 items-center justify-center px-2 text-sm"
              />
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="space-y-3 md:hidden">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
           { (data?.meta.totalPages ?? 0) > 1 && (
            <div className="flex justify-center pt-4">
              <ReactPaginate
                pageCount={data?.meta.totalPages ?? 0}
                forcePage={page - 1}
                onPageChange={(selectedItem) => {
                  setPage(selectedItem.selected + 1)
                }}
                previousLabel="Previous"
                nextLabel="Next"
                breakLabel="..."
                containerClassName="flex items-center gap-2"
                pageClassName="flex"
                pageLinkClassName="flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-md border px-3 text-sm hover:bg-muted"
                activeLinkClassName="bg-primary text-primary-foreground hover:bg-primary"
                previousClassName="flex"
                previousLinkClassName="flex h-9 items-center cursor-pointer justify-center rounded-md border px-3 text-sm hover:bg-muted"
                nextClassName="flex"
                nextLinkClassName="flex h-9 items-center cursor-pointer justify-center rounded-md border px-3 text-sm hover:bg-muted"
                breakClassName="flex"
                breakLinkClassName="flex h-9 min-w-9 items-center justify-center px-2 text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}