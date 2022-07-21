import React from "react";
import Button from "./Button";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: Button,
  title: "Button",
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "TEST",
  state: "defualt",
};

export const Active = Template.bind({});
