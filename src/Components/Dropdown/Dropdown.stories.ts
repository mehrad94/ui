


import type { Meta, StoryObj } from "@storybook/react";
import Dropdown, { IDropdown } from ".";


type DropdownStory = StoryObj<IDropdown>;

 const PROVINCE_DROP_DOWN = [
  { value: 'TEHRAN', label: 'تهران ' },
  { value: 'ALBORZ', label: ' البرز' },
  { value: 'GUILAN', label: 'گیلان' }
];

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
  argTypes: {
    label: { type: "string" },
    id: { type: "string" },
    options: { type: "string", control: false }, // Assuming options is an array of objects
    onSelect: { action: "onSelect" }, // Assuming onSelect is a function
    placeholder: { type: "string", defaultValue: "یک مورد را انتخاب کنید" },
    error: { type: "string" }, // Assuming errors is an object
    register: { control: false }, // Assuming register is not a user-input prop,
    borderColor: { control: "color" }, // Add argType for border color
    labelColor: { control: "color" }, 
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "gkjg",
    id: "gkg",
    options: PROVINCE_DROP_DOWN, // Assuming options is an array of objects
    placeholder: "jgkgj",
    borderColor: "#000000", // Default border color
    labelColor: "#4b5563", // Default label color
    onSelect: ()=>{},
    error: "error",
    isRtl: true,
   required: true,
   size: "large"
  }
};
