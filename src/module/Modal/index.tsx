import { useState } from "react";
import Button from "@/components/Button"
import Modal from "@/components/Modal";
import Title from "@/components/Title"

export default () => {
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  return (
    <div>
      <Title title="弹出框" />

      <div className="flex space-x-2">
        <Button className="!text-white !bg-green-500 shadow-[0_2px_5px_#52C55B] hover:shadow-[0_2px_10px_#52C55B] transition-shadow" onClick={() => setModalOpen1(true)}>普通弹框</Button>
        <Button className="!text-white !bg-[#727cf5] shadow-[0_2px_5px_#727cf5] hover:shadow-[0_2px_10px_#727cf5] transition-shadow" onClick={() => setModalOpen2(true)}>自定义弹框</Button>
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
          <Button className="!text-white !bg-[#727cf5] hover:!bg-[#868ffc]" onClick={() => console.log('你点击了确定')}>确定</Button>
        </div>
      </Modal>
    </div>
  )
}