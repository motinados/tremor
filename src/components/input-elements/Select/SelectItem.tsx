"use client";
import { tremorTwMerge } from "lib";
import React, { cloneElement, isValidElement } from "react";

import { Listbox } from "@headlessui/react";
import { makeClassName } from "lib";
import { sizing } from "lib/sizing";
import { spacing } from "lib/spacing";

const makeSelectItemClassName = makeClassName("SelectItem");

export interface SelectItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  icon?: React.ElementType | React.ReactElement;
}

const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>((props, ref) => {
  const { value, icon, className, children, ...other } = props;

  let Icon: React.ReactElement | undefined;
  if (icon) {
    if (isValidElement(icon)) {
      Icon = cloneElement(icon as React.ReactElement, {
        className: tremorTwMerge(
          makeSelectItemClassName("icon"),
          // common
          "flex-none",
          // light
          "text-tremor-content-subtle",
          // dark
          "dark:text-dark-tremor-content-subtle",
          sizing.lg.width,
          spacing.xs.marginRight,
        ),
      });
    } else {
      const IconElm = icon as React.ElementType;
      Icon = (
        <IconElm
          className={tremorTwMerge(
            makeSelectItemClassName("icon"),
            // common
            "flex-none",
            // light
            "text-tremor-content-subtle",
            // dark
            "dark:text-dark-tremor-content-subtle",
            sizing.lg.width,
            spacing.xs.marginRight,
          )}
        />
      );
    }
  }

  return (
    <Listbox.Option
      className={tremorTwMerge(
        makeSelectItemClassName("root"),
        // common
        "flex justify-start items-center cursor-default text-tremor-default",
        // light
        "ui-active:bg-tremor-background-muted  ui-active:text-tremor-content-strong ui-selected:text-tremor-content-strong ui-selected:bg-tremor-background-muted text-tremor-content-emphasis",
        // dark
        "dark:ui-active:bg-dark-tremor-background-muted  dark:ui-active:text-dark-tremor-content-strong dark:ui-selected:text-dark-tremor-content-strong dark:ui-selected:bg-dark-tremor-background-muted dark:text-dark-tremor-content-emphasis",
        spacing.md.paddingX,
        spacing.md.paddingY,
        className,
      )}
      ref={ref}
      key={value}
      value={value}
      {...other}
    >
      {Icon}
      <span className="whitespace-nowrap truncate">{children ?? value}</span>
    </Listbox.Option>
  );
});

SelectItem.displayName = "SelectItem";

export default SelectItem;
