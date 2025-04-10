import { useState } from "react";
import Button from "@/components/Button";
import Title from "@/components/Title";
import { HiOutlineLockClosed } from "react-icons/hi";

export default () => {
  const [btnLoading1, setBtnLoading1] = useState(false);

  return (
    <div>
      <Title title="按钮" />

      <div className="flex space-x-2">
        <Button className="border">普通按钮</Button>

        <Button
          loading={btnLoading1}
          className="!text-white !bg-blue-500 hover:!bg-blue-600"
          onClick={() => {
            setBtnLoading1(true);

            setTimeout(() => {
              setBtnLoading1(false);
            }, 2000);
          }}>加载按钮</Button>

        <Button icon={<HiOutlineLockClosed className="text-md" />} className="!text-white !bg-gray-700 hover:!bg-gray-800">带图标的按钮</Button>

        <Button className="!text-white !bg-[#727cf5] hover:bg-[#727cf5] shadow-[0_2px_5px_#727cf5] hover:shadow-[0_2px_10px_#727cf5] transition-shadow">自定义样式</Button>
      </div>
    </div>
  )
}