import { getUserOrders } from "@/services/order.service";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IOrder } from "@/interfaces/order.interface";

export default async function MyOrdersPage() {
  const orders = await getUserOrders();

  return (
    <section className="py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <Table className="border rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead>Total Price</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders?.data?.map((order: IOrder ) => (
            <TableRow
              key={order.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <TableCell>{order.paymentMethodType}</TableCell>

              <TableCell>
                {order.isDelivered ? (
                  <Badge className="bg-green-500 text-white">Delivered</Badge>
                ) : (
                  <Badge variant="secondary">Pending</Badge>
                )}
              </TableCell>

              <TableCell>
                {order.isPaid ? (
                  <Badge className="bg-green-500 text-white">Paid</Badge>
                ) : (
                  <Badge variant="destructive">Unpaid</Badge>
                )}
              </TableCell>

              <TableCell>{order.totalOrderPrice} EGP</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
