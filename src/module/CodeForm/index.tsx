import CodeForm from "@/components/CodeForm"
import Title from "@/components/Title"

export default () => {
  return (
    <div>
      <Title title="验证码" />

      <p className="text-sm text-gray-500 mb-2">默认样式</p>
      <CodeForm onComplete={(value) => console.log('验证码输入完成：', value)} />

      <p className="text-sm text-gray-500 mb-2 mt-4">自定义样式</p>
      <CodeForm onComplete={(value) => console.log('验证码输入完成：', value)} className="[&>div>input]:rounded-lg [&>div>input]:border-gray-300 [&>div>input]:focus:border-transparent [&>div>input]:focus:ring-2 [&>div>input]:ring-green-400" />
    </div>
  )
}