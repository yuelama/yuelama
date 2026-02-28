import { useState } from "react";
import { Search, MapPin, Clock, Users } from "lucide-react";
import { mockCourses } from "../data/mockData";
import { Course, Order } from "../types/course";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCourses = mockCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookCourse = (course: Course) => {
    setSelectedCourse(course);
    setSelectedSchedule(course.schedules[0]);
    setIsDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedCourse || !selectedSchedule) return;

    const newOrder: Order = {
      id: Date.now().toString(),
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      instructor: selectedCourse.instructor,
      selectedSchedule,
      orderDate: new Date().toISOString(),
      status: "pending",
      price: selectedCourse.price,
      location: selectedCourse.location,
    };

    // 保存到 localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    toast.success("预约成功！", {
      description: "您可以在「我的订单」中查看预约详情",
    });

    setIsDialogOpen(false);
    setSelectedCourse(null);
    setSelectedSchedule("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部搜索栏 */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索课程名称、老师、分类..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 课程列表 */}
      <div className="p-4 space-y-4">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>暂无相关课程</p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex gap-3 p-3">
                <div className="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-base line-clamp-1">{course.title}</h3>
                      <span className="text-blue-600 font-bold text-base flex-shrink-0">¥{course.price}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {course.instructor} · {course.category}
                    </p>
                    
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="line-clamp-1">{course.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>剩余 {course.availableSeats} 个名额</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => handleBookCourse(course)}
                    disabled={course.availableSeats === 0}
                  >
                    {course.availableSeats === 0 ? "已满" : "立即预约"}
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 预约对话框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>预约课程</DialogTitle>
            <DialogDescription>
              请选择上课时间
            </DialogDescription>
          </DialogHeader>
          
          {selectedCourse && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold mb-1">{selectedCourse.title}</h4>
                <p className="text-sm text-gray-600">{selectedCourse.instructor}</p>
                <p className="text-sm text-gray-600">{selectedCourse.location}</p>
                <p className="text-blue-600 font-bold mt-2">¥{selectedCourse.price}</p>
              </div>

              <div className="space-y-2">
                <Label>选择上课时间</Label>
                <RadioGroup value={selectedSchedule} onValueChange={setSelectedSchedule}>
                  {selectedCourse.schedules.map((schedule) => (
                    <div key={schedule} className="flex items-center space-x-2">
                      <RadioGroupItem value={schedule} id={schedule} />
                      <Label htmlFor={schedule} className="cursor-pointer">
                        {schedule}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleConfirmBooking}>
              确认预约
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}