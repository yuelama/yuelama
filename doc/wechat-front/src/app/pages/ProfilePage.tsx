import { useState, useEffect } from "react";
import { Camera, ChevronRight, Phone, Mail, User as UserIcon } from "lucide-react";
import { UserProfile } from "../types/course";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const defaultProfile: UserProfile = {
  name: "微信用户",
  phone: "",
  email: "",
  avatar: "https://images.unsplash.com/photo-1724435811349-32d27f4d5806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwcm9maWxlJTIwYXZhdGFyfGVufDF8fHx8MTc3MjIzOTk4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
};

export function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setEditForm(parsed);
    }
  };

  const handleEditProfile = () => {
    setEditForm(profile);
    setIsEditDialogOpen(true);
  };

  const handleSaveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(editForm));
    setProfile(editForm);
    setIsEditDialogOpen(false);
    toast.success("个人资料已更新");
  };

  const menuItems = [
    {
      icon: Phone,
      label: "联系电话",
      value: profile.phone || "未设置",
      onClick: handleEditProfile,
    },
    {
      icon: Mail,
      label: "电子邮箱",
      value: profile.email || "未设置",
      onClick: handleEditProfile,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-xl font-semibold">个人资料</h1>
        </div>
      </div>

      {/* 头像和昵称 */}
      <Card className="m-4 p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={profile.avatar}
                alt="头像"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-1">{profile.name}</h2>
            <p className="text-sm text-gray-500">点击头像更换</p>
          </div>

          <Button variant="outline" size="sm" onClick={handleEditProfile}>
            编辑
          </Button>
        </div>
      </Card>

      {/* 个人信息列表 */}
      <Card className="m-4">
        <div className="divide-y divide-gray-100">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              <item.icon className="w-5 h-5 text-gray-400" />
              <div className="flex-1 text-left">
                <p className="text-sm text-gray-500 mb-0.5">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </Card>

      {/* 统计信息 */}
      <Card className="m-4 p-4">
        <h3 className="font-semibold mb-3">我的数据</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {JSON.parse(localStorage.getItem("orders") || "[]").filter(
                (o: any) => o.status !== "cancelled"
              ).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">已预约课程</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {JSON.parse(localStorage.getItem("orders") || "[]").filter(
                (o: any) => o.status === "confirmed"
              ).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">已完成课程</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">
              {JSON.parse(localStorage.getItem("orders") || "[]").filter(
                (o: any) => o.status === "pending"
              ).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">待确认课程</p>
          </div>
        </div>
      </Card>

      {/* 编辑资料对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>编辑个人资料</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">昵称</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="pl-10"
                  placeholder="请输入昵称"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">联系电话</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="pl-10"
                  placeholder="请输入手机号码"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">电子邮箱</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="pl-10"
                  placeholder="请输入邮箱地址"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSaveProfile}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
