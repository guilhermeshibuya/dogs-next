'use client'

type ButtonProps = React.ComponentProps<'button'>

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <>
      <button className="button" {...props}>
        {children}
      </button>
    </>
  )
}
