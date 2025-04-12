"use client";

import { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";

import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import { LucideIcon } from "lucide-react";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  description?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  IconAbsView?: LucideIcon;
  IconAbsOff?: LucideIcon;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    placeholder,
    iconSrc,
    iconAlt,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    IconAbsView,
    IconAbsOff,
  } = props;
  const [isView, setIsView] = useState<boolean>(false);
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="w-full relative flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              type={
                props.name === "password" || props.name === "confirmPassword"
                  ? isView
                    ? "text"
                    : "password"
                  : "text"
              }
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
          <button
            className="outline-none border-none absolute left-[92%] top-[22%] text-[#CDE9DF]"
            onClick={() => setIsView((prevView) => !prevView)}
            type="button"
          >
            {isView
              ? IconAbsView && <IconAbsView size={22} />
              : IconAbsOff && <IconAbsOff size={22} />}
          </button>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="SN"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, placeholder, iconSrc, iconAlt } =
    props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 text-white">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="text-white">{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error"></FormMessage>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
