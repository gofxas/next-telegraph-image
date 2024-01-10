"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import copy from "copy-to-clipboard";
import { toast } from "sonner";
export function List() {
  const friendCount = useLiveQuery(() => db.image?.count());
  const list = useLiveQuery(() => db.image.toArray()) || [];
  const del = (item) => {
    db.image.delete(item.id);
  };

  const copyLink = (i) => {
    const link = location.origin + i.src;
    copy(link);
    toast.success("复制成功！");
  };

  const open = (i) => {
    window.open(location.origin + i.src);
  };

  return (
    <>
      <div className="flex justify-between items-center p-2 border border-slate-300 rounded my-3">
        <p>文件总数：{friendCount}</p>
        <Button>导出列表</Button>
      </div>
      <ScrollArea className={cn("p-2 flex-1 h-[400px]")}>
        <table className="max-w-full w-full border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border p-2 border-slate-300">地址</th>
              <th className="border p-2 hidden md:table-cell border-slate-300">
                时间
              </th>
              <th className="border p-2 border-slate-300">操作</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td className="border p-2 border-slate-300">{item.src}</td>
                <td className="border p-2 hidden md:table-cell border-slate-300">
                  {item.createAt.toLocaleDateString() +
                    item.createAt.toLocaleTimeString()}
                </td>
                <td className="border p-2 text-center border-slate-300">
                  <Button onClick={() => copyLink(item)} variant="link">
                    复制
                  </Button>
                  <Button onClick={() => open(item)} variant="link">
                    查看
                  </Button>
                  <Button onClick={() => del(item)} variant="link">
                    清除
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </>
  );
}
