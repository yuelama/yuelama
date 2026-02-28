import { useState, useEffect } from "react";
import { Clock, MapPin, Calendar, X } from "lucide-react";
import { Order } from "../types/course";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { toast } from "sonner";

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    // 按预约时间倒序排列
    savedOrders.sort((a: Order, b: Order) => 
      new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    );
    setOrders(savedOrders);
  };

  const handleCancelOrder = (orderId: string) => {
    setOrderToCancel(orderId);
  };

  const confirmCancelOrder = () => {
    if (!orderToCancel) return;

    const updatedOrders = orders.map((order) =>
      order.id === orderToCancel
        ? { ...order, status: "cancelled" as const }
        : order
    );

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setOrderToCancel(null);

    toast.success("订单已取消");
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "待确认";
      case "confirmed":
        return "已确认";
      case "cancelled":
        return "已取消";
    }
  };

  const getStatusVariant = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "confirmed":
        return "default";
      case "cancelled":
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-xl font-semibold">我的订单</h1>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="p-4 space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">暂无订单</p>
            <p className="text-sm text-gray-400">快去预约心仪的课程吧～</p>
          </div>
        ) : (
          orders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-base mb-1">{order.courseTitle}</h3>
                  <p className="text-sm text-gray-600">{order.instructor}</p>
                </div>
                <Badge variant={getStatusVariant(order.status)}>
                  {getStatusText(order.status)}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>{order.selectedSchedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{order.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>预约时间：{new Date(order.orderDate).toLocaleString("zh-CN")}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="text-blue-600 font-bold">¥{order.price}</div>
                {order.status === "pending" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    取消订单
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 取消订单确认对话框 */}
      <AlertDialog open={!!orderToCancel} onOpenChange={() => setOrderToCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认取消订单？</AlertDialogTitle>
            <AlertDialogDescription>
              取消后将无法恢复，您需要重新预约该课程。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>返回</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancelOrder}>确认取消</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
