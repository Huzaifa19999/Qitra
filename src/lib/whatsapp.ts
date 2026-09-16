import { formatCurrency } from './utils';
import type { Order, OrderItem, Product } from '@prisma/client';

type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[];
};

export async function sendOrderConfirmation(order: OrderWithItems): Promise<{ success: boolean; error?: string }> {
  try {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!phoneNumberId || !accessToken) {
      console.warn('WhatsApp API credentials are not configured.');
      return { success: false, error: 'WhatsApp API credentials are not configured.' };
    }

    const itemsSummary = order.items
      .map((item: { quantity: any; product: { name: any; }; price: string | number | { toNumber?: () => number; }; }):any => `- ${item.quantity}x ${item.product.name} (${formatCurrency(item.price)})`)
      .join('\n');

    const message = `Hello ${order.customerName},\n\nThank you for your order from Qitra Luxury Store!\n\nOrder Number: ${order.orderNumber}\n\nOrder Details:\n${itemsSummary}\n\nTotal: ${formatCurrency(order.totalAmount)}\n\nDelivery Address:\n${order.address}, ${order.city}\n\nWe will contact you shortly when your order is out for delivery.`;

    const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: order.whatsapp.replace(/\D/g, ''), // Ensure clean number
        type: 'text',
        text: {
          body: message,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WhatsApp API Error:', errorData);
      return { success: false, error: 'Failed to send WhatsApp message' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
