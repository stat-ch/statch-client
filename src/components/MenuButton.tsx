export interface MenuButtonProps {
  label: string
  active: boolean
  onClick?: () => void
}

const MenuButton = (menu: MenuButtonProps) => {
  const classList = 'h-10 px-6 font-semibold rounded-md text-white '

  return (
    <button className="h-10 bg-sky-200 px-6 py-2 font-bold text-black">
      {menu.label}
    </button>
  )
}

export default MenuButton
