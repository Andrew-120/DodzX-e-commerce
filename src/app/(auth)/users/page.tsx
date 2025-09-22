"use client";

import { useEffect, useState, useTransition } from "react";
import {  getUsers } from "@/services/users.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [keyword, setKeyword] = useState("");
  const [isPending, startTransition] = useTransition();

  async function loadUsers(search?: string) {
    startTransition(async () => {
      const res = await getUsers(search);
      if (res.success) {
        setUsers(res.data);
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    });
  }

  useEffect(() => {
    loadUsers(); 
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h1 className="font-bold text-3xl mb-8">All Users</h1>

        {/* Search */}
        <div className="flex items-center gap-3 mb-6">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search users by name/email..."
          />
          <Button
            onClick={() => loadUsers(keyword)}
            disabled={isPending}
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : "Search"}
          </Button>
        </div>

        
        {users.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || "—"}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </section>
  );
}
