"use client";

import { useState } from "react";
import Modal from "./components/Modal";
import Button from "./components/Button";
import { HiOutlineLockClosed } from "react-icons/hi";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        icon={<HiOutlineLockClosed className="text-md" />}
      >点击</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Modal Title"
      >
        <h1>Modal</h1>
      </Modal>
    </>
  );
}