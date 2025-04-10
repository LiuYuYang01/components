"use client";

import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { HiOutlineLockClosed } from "react-icons/hi";
import Calendar from "@/components/Calendar";
import Title from "@/components/Title";
import CodeForm from "@/components/CodeForm";

export default function Home() {
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  return (
    <>
      <div className="w-[800px] mx-auto mt-10 space-y-16">
        <div>
          <Title title="按钮" />
          <div className="space-y-2">
            <Button>普通按钮</Button>

            <Button icon={<HiOutlineLockClosed className="text-md" />}>带图标的按钮</Button>

            <Button className="bg-green-500 hover:bg-green-600">自定义样式</Button>
          </div>
        </div>

        <div>
          <Title title="弹出框" />
          <div className="space-y-2">
            <Button onClick={() => setModalOpen1(true)}>普通弹框</Button>
            <Button onClick={() => setModalOpen2(true)}>自定义弹框</Button>
          </div>
        </div>

        <div>
          <Title title="日历" />
          <Calendar className="mt-4" />
        </div>

        <div>
          <Title title="验证码" />

          <p className="text-sm text-gray-500 mb-2">默认样式</p>
          <CodeForm />

          <p className="text-sm text-gray-500 mb-2 mt-4">自定义样式</p>
          <CodeForm className="[&>div>input]:rounded-lg [&>div>input]:border-gray-300 [&>div>input]:focus:border-transparent [&>div>input]:focus:ring-2 [&>div>input]:ring-green-400" />
        </div>

        <div className="mb-[2000px]"></div>
      </div>

      <Modal
        title="Modal Title"
        open={modalOpen1}
        onClose={() => setModalOpen1(false)}
      >
        <p className="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
      </Modal>

      <Modal
        title="Modal Title"
        open={modalOpen2}
        onClose={() => setModalOpen2(false)}
        className="!w-[90%] sm:!w-[500px]"
      >
        <p className="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
        
        <div className="flex justify-end gap-2 mt-3 mb-2">
          <Button className="border border-gray-200 bg-white !text-black hover:!bg-gray-100" onClick={() => setModalOpen2(false)}>取消</Button>
          <Button onClick={() => console.log('你点击了确定')}>确定</Button>
        </div>
      </Modal>
    </>
  );
}