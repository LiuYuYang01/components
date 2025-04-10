"use client";

import ButtonModule from "@/module/Button";
import ModalModule from "@/module/Modal";
import CalendarModule from "@/module/Calendar";
import CodeFormModule from "@/module/CodeForm";

export default function Home() {
  return (
    <>
      <div className="w-[90%] mx-auto mt-10 space-y-16">
        <ButtonModule />
        <ModalModule />
        <CalendarModule />
        <CodeFormModule />
        {/* <div className="mb-[2000px]"></div> */}
      </div>
    </>
  );
}