import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import UpdateOrderStatus from './UpdateOrderStatus';

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-white">Orders Management</h1>
        <span className="text-gray-400 text-sm">{orders.length} total orders</span>
      </div>

      <div className="glass card-dark rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-dark">
            <thead className="bg-[#1a1a2e]/50 text-gray-400 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Order #</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-mono text-sm">{order.orderNumber}</td>
                  <td className="px-6 py-4 text-gray-300">
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-xs text-gray-500 mt-1">{order.city}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{order.phone}</td>
                  <td className="px-6 py-4 text-gray-400">{order.items.length}</td>
                  <td className="px-6 py-4 text-[#d4af37] font-medium">{formatCurrency(Number(order.totalAmount))}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <UpdateOrderStatus orderId={order.id} currentStatus={order.status} />
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
