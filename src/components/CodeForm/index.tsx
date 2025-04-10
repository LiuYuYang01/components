import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';

// 组件属性接口：定义可选的完成回调函数
interface Props {
  onComplete?: (code: string) => void;
  className?: string;
}

export default forwardRef(({ onComplete, className }: Props, ref) => {
  // 状态管理
  const [code, setCode] = useState<string[]>(Array(6).fill('')); // 存储6位验证码
  const [activeIndex, setActiveIndex] = useState(0);  // 当前激活的输入框索引
  const [isActive, setIsActive] = useState(true);    // 修改初始值为 true，使组件初始化时处于激活状态

  // ref引用
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // 存储输入框DOM引用
  const containerRef = useRef<HTMLDivElement>(null);         // 容器DOM引用

  // 点击外部区域时取消激活状态
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 如果点击的不是当前验证码组件，则取消激活状态
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 自动聚焦当前激活的输入框
  useEffect(() => {
    if (isActive) inputRefs.current[activeIndex]?.focus();
  }, [activeIndex, isActive]);

  // 处理输入框点击事件
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActive(true);
    inputRefs.current[activeIndex]?.focus();
  };

  // 处理容器点击事件
  const handleContainerClick = () => {
    setIsActive(true);
    inputRefs.current[activeIndex]?.focus();
  };

  // 处理输入变化
  const handleChange = (index: number, value: string) => {
    if (!isActive || index !== activeIndex) return;

    if (!/^\d*$/.test(value)) return; // 只允许输入数字

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // 自动跳转到下一个输入框
    if (index < 5) {
      setActiveIndex(index + 1);
    }

    // 完成输入时触发回调
    if (index === 5) {
      onComplete?.(newCode.join(''));
    }
  };

  // 处理键盘事件（主要用于退格键）
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isActive) return;

    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        // 当前输入框为空时，删除前一个输入框的内容
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        setActiveIndex(index - 1);
      } else {
        // 删除当前输入框的内容
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  // 添加粘贴事件处理函数
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();

    // 如果组件不处于激活状态，则不处理粘贴事件
    if (!isActive) return;

    // 获取剪贴板的内容
    const pastedText = e.clipboardData.getData('text');
    // 使用正则表达式去除非数字字符，并限制长度为6位
    const numbers = pastedText.replace(/[^\d]/g, '').split('').slice(0, 6);

    // 如果粘贴的内容是数字，则更新验证码
    if (numbers.length) {
      const newCode = [...code];

      // 将粘贴的内容填充到验证码数组中
      numbers.forEach((num, index) => {
        if (index < 6) newCode[index] = num;
      });
      setCode(newCode);

      // 设置焦点到最后一个填充的数字之后，或者到最后一个输入框
      const nextIndex = Math.min(numbers.length, 5);
      setActiveIndex(nextIndex);

      // 如果粘贴的内容正好是 6 位数字，则触发完成回调
      if (numbers.length === 6) {
        onComplete?.(newCode.join(''));
      }
    }
  };

  // 组件挂载时自动聚焦第一个输入框
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []); // 仅在组件挂载时执行一次

  // 暴露给父组件的重置方法
  useImperativeHandle(ref, () => ({
    // 初始化数据
    reset: () => {
      setCode(Array(6).fill(''));
      setActiveIndex(0);
      setIsActive(true);
    },
    // 聚焦表单
    focus: () => {
      setIsActive(true);
      inputRefs.current[activeIndex]?.focus()
    }
  }));

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={`flex items-center ${className ? className : ''}`}
    >
      {/* 前三位验证码输入框 */}
      <div className="flex gap-1">
        {[0, 1, 2].map((index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={code[index]}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onClick={handleClick}
            onPaste={handlePaste}
            readOnly={!isActive || index !== activeIndex}
            className={`w-12 h-12 text-center border rounded cursor-pointer
              ${isActive && index === activeIndex ? 'border-blue-500' : 'border-gray-300'}
              ${index > activeIndex ? 'bg-gray-100' : 'bg-white'}
              focus:outline-none`}
          />
        ))}
      </div>

      {/* 分隔符 */}
      <div className="mx-2 text-gray-300">--</div>

      {/* 后三位验证码输入框 */}
      <div className="flex gap-1">
        {[3, 4, 5].map((index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={code[index]}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onClick={handleClick}
            onPaste={handlePaste}
            readOnly={!isActive || index !== activeIndex}
            className={`w-12 h-12 text-center border rounded cursor-pointer
              ${isActive && index === activeIndex ? 'border-blue-500' : 'border-gray-300'}
              ${index > activeIndex ? 'bg-gray-100' : 'bg-white'}
              focus:outline-none`}
          />
        ))}
      </div>
    </div>
  );
})