import React from "react";
import Button from "./Button";

export default {
  component: Button,
  title: "Button",
};

const Template = ({ args }: { args: any }) => <Button {...args} />;

export const Default = Template.bind({});

export const Active = Template.bind({});
