"use client";

import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { HiOutlineLockClosed } from "react-icons/hi";
import Calendar from "@/components/Calendar";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <Button>普通按钮</Button>

        <Button icon={<HiOutlineLockClosed className="text-md" />}>带图标的按钮</Button>

        <Button className="bg-green-500 hover:bg-green-600">自定义样式</Button>

        <Button onClick={() => setOpen(!open)}>点击弹框</Button>
      </div>

      <Modal
        title="Modal Title"
        open={open}
        onClose={() => setOpen(false)}
      >
        <p className="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
      </Modal>

      <Calendar className="mt-4" />
    </>
  );
}