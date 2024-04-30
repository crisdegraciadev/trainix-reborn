/* eslint-disable */

import { ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "./button";
import { Input, InputProps } from "./input";
import { Separator } from "./separator";

type InputNumberProps = Omit<InputProps, "form"> & {
  controlName: string;
  form: UseFormReturn<any>;
};

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  ({ form, controlName, ...props }, fordwardRef) => {
    const { value } = props;

    const [numericValue, setNumericValue] = useState(parseInt(value as string) ?? 0);

    const handleIncrement = (e: React.MouseEvent<Element, MouseEvent>) => {
      e.preventDefault();
      setNumericValue((val) => (val === 999 ? val : val + 1));
    };

    const handleDecrement = (e: React.MouseEvent<Element, MouseEvent>) => {
      e.preventDefault();
      setNumericValue((val) => (val === 1 ? val : val - 1));
    };

    const handleChange = (e: any) => {
      const { value } = e.target;

      if (Number(value) > 0 || value === "") {
        setNumericValue(value);
      }
    };

    useEffect(() => {
      if (form.getValues(controlName as any) !== numericValue) {
        form.setValue(controlName as any, numericValue);
      }
    }, [numericValue, controlName, form]);

    return (
      <div className="flex rounded-md border justify-between">
        <Input
          {...props}
          ref={fordwardRef}
          type="text"
          pattern="[0-9]+"
          className="border-0 px-0 w-10 focus-visible:ring-0 focus-visible:ring-offset-0 text-end"
          value={numericValue}
          onChange={handleChange}
        />

        <div className="flex flex-col items-center justify-evenly w-6  border-l">
          <Button
            onClick={handleIncrement}
            variant="outline"
            size="icon"
            className="h-full w-full border-0 rounder-tr-md rounded-tl-none rounded-bl-none rounded-br-none"
          >
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Separator />

          <Button
            onClick={handleDecrement}
            variant="outline"
            size="icon"
            className="h-full w-full border-0 rounded-tr-none rounded-tl-none rounded-bl-none rounded-br-md"
          >
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    );
  },
);

InputNumber.displayName = "InputNumber";

export { InputNumber };
