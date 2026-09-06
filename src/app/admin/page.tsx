import { prisma } from '@/lib/prisma';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { Package, ShoppingBag, DollarSign, AlertTriangle } from 'lucide-react';

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [totalProducts, totalOrders, lowStockProducts, recentOrders, revenueData] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.product.count({ where: { stock: { lt: 10 } } }),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
      },
    }),
    prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: {
          not: 'CANCELLED',
        },
      },
    }),
  ]);

  const totalRevenue = revenueData._sum.totalAmount ? Number(revenueData._sum.totalAmount) : 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-white">Dashboard</h1>
        <div className="flex gap-3">
          <Link href="/admin/products/new" className="btn-outline-gold px-4 py-2 rounded-lg border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-colors">
            Add Product
          </Link>
          <Link href="/admin/orders" className="btn-gold px-4 py-2 rounded-lg bg-[#d4af37] text-black font-medium hover:bg-[#b5952f] transition-colors">
            View Orders
          </Link>
        </div>
      </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
  {/* Total Products */}
  <div className="group relative overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#161625] to-[#0f0f18] p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/50 hover:shadow-xl hover:shadow-[#d4af37]/10">
    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#d4af37]/5 blur-2xl transition-all duration-300 group-hover:bg-[#d4af37]/10" />

    <div className="relative flex items-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/10 text-[#d4af37] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#d4af37]/15">
        <Package size={26} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-400">
          Total Products
        </p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-white">
          {totalProducts}
        </p>
      </div>
    </div>
  </div>

  {/* Total Orders */}
  <div className="group relative overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#161625] to-[#0f0f18] p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/50 hover:shadow-xl hover:shadow-[#d4af37]/10">
    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#d4af37]/5 blur-2xl transition-all duration-300 group-hover:bg-[#d4af37]/10" />

    <div className="relative flex items-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/10 text-[#d4af37] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#d4af37]/15">
        <ShoppingBag size={26} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-400">
          Total Orders
        </p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-white">
          {totalOrders}
        </p>
      </div>
    </div>
  </div>

  {/* Revenue */}
  <div className="group relative overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#161625] to-[#0f0f18] p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/50 hover:shadow-xl hover:shadow-[#d4af37]/10">
    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#d4af37]/5 blur-2xl transition-all duration-300 group-hover:bg-[#d4af37]/10" />

    <div className="relative flex items-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/10 text-[#d4af37] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#d4af37]/15">
        <DollarSign size={26} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-400">
          Revenue
        </p>
        <p className="mt-1 truncate text-2xl font-bold tracking-tight text-white">
          {formatCurrency(totalRevenue)}
        </p>
      </div>
    </div>
  </div>

  {/* Low Stock */}
  <div className="group relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-[#161625] to-[#0f0f18] p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/10">
    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-500/5 blur-2xl transition-all duration-300 group-hover:bg-red-500/10" />

    <div className="relative flex items-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 transition-all duration-300 group-hover:scale-105 group-hover:bg-red-500/15">
        <AlertTriangle size={26} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-400">
          Low Stock Alerts
        </p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-white">
          {lowStockProducts}
        </p>
      </div>
    </div>
  </div>
</div>

      <div className="glass card-dark rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-serif text-white">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left table-dark">
            <thead className="bg-[#1a1a2e]/50 text-gray-400 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Order #</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {recentOrders.map((order:any) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-mono">{order.orderNumber}</td>
                  <td className="px-6 py-4 text-gray-300">{order.customerName}</td>
                  <td className="px-6 py-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-white">{formatCurrency(Number(order.totalAmount))}</td>
                  <td className="px-6 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
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
