import { ComponentMeta, ComponentStory } from '@storybook/react'
import MenuButton, { MenuButtonProps } from './MenuButton'

export default {
  component: MenuButton,
  title: 'MenuButton'
} as ComponentMeta<typeof MenuButton>

const Template: ComponentStory<typeof MenuButton> = (args) => (
  <MenuButton {...args} />
)

export const Default = Template.bind({})
Default.args = { label: 'NFT Market', active: false }

export const Active = Template.bind({})
Active.args = { label: 'NFT Market', active: true }
