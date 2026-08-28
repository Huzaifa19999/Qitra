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
        <div className="flex gap-4">
          <Link href="/admin/products/new" className="btn-outline-gold px-4 py-2 rounded-lg border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-colors">
            Add Product
          </Link>
          <Link href="/admin/orders" className="btn-gold px-4 py-2 rounded-lg bg-[#d4af37] text-black font-medium hover:bg-[#b5952f] transition-colors">
            View Orders
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-gold p-6 rounded-xl border border-[#d4af37]/20 flex items-center space-x-4">
          <div className="p-3 bg-[#1a1a2e] rounded-lg text-[#d4af37]">
            <Package size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Products</p>
            <p className="text-2xl font-bold text-white">{totalProducts}</p>
          </div>
        </div>
        
        <div className="glass-gold p-6 rounded-xl border border-[#d4af37]/20 flex items-center space-x-4">
          <div className="p-3 bg-[#1a1a2e] rounded-lg text-[#d4af37]">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Orders</p>
            <p className="text-2xl font-bold text-white">{totalOrders}</p>
          </div>
        </div>

        <div className="glass-gold p-6 rounded-xl border border-[#d4af37]/20 flex items-center space-x-4">
          <div className="p-3 bg-[#1a1a2e] rounded-lg text-[#d4af37]">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Revenue</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
          </div>
        </div>

        <div className="glass-gold p-6 rounded-xl border border-red-500/20 flex items-center space-x-4">
          <div className="p-3 bg-[#1a1a2e] rounded-lg text-red-400">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Low Stock Alerts</p>
            <p className="text-2xl font-bold text-white">{lowStockProducts}</p>
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
              {recentOrders.map((order) => (
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
