import React, { useState } from 'react';
import DatePicker from './index';

const DatePickerExample: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: null as Date | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('表单数据:', formData);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            姓名
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入姓名"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            选择日期
          </label>
          <DatePicker
            value={formData.date || undefined}
            onChange={(date) => setFormData({ ...formData, date })}
            placeholder="请选择日期"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          提交
        </button>
      </form>
    </div>
  );
};

export default DatePickerExample; 