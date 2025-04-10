import { Calendar } from "@/components/Calendar"
import { ManyCalendar } from "@/components/Calendar"

import Title from "@/components/Title"

export default () => {
  return (
    <div>
      <Title title="日历" />

      <div className="flex space-x-8">
        <div>
          <p className="text-sm text-gray-500 mb-2">默认样式</p>
          <Calendar className="mt-4" />
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">快速选择</p>
          <Calendar isQuickSelect className="mt-4" />
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">多日期</p>
          <ManyCalendar className="mt-4" />
        </div>
      </div>
    </div>
  )
}