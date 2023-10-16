"use client";
import { useInternalState } from "hooks";
import { tremorTwMerge } from "lib";
import React, { cloneElement, isValidElement, useMemo, useState } from "react";

import { Combobox } from "@headlessui/react";
import { ArrowDownHeadIcon, XCircleIcon } from "assets";
import { border, makeClassName, sizing, spacing } from "lib";
import {
  constructValueToNameMapping,
  getFilteredOptions,
  getSelectButtonColors,
  hasValue,
} from "../selectUtils";

const makeSearchSelectClassName = makeClassName("SearchSelect");

export interface SearchSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ElementType | React.JSXElementConstructor<any> | React.ReactElement;
  enableClear?: boolean;
  children: React.ReactElement[] | React.ReactElement;
}

const makeSelectClassName = makeClassName("SearchSelect");

const SearchSelect = React.forwardRef<HTMLDivElement, SearchSelectProps>((props, ref) => {
  const {
    defaultValue,
    value,
    onValueChange,
    placeholder = "Select...",
    disabled = false,
    icon,
    enableClear = true,
    children,
    className,
    ...other
  } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useInternalState(defaultValue, value);

  let Icon: React.ReactElement | undefined;
  if (icon) {
    if (isValidElement(icon)) {
      Icon = cloneElement(icon as React.ReactElement, {
        className: tremorTwMerge(
          makeSearchSelectClassName("Icon"),
          // common
          "flex-none",
          // light
          "text-tremor-content-subtle",
          // dark
          "dark:text-dark-tremor-content-subtle",
          sizing.lg.height,
          sizing.lg.width,
        ),
      });
    } else {
      const IconElm = icon as React.ElementType | React.JSXElementConstructor<any>;
      Icon = (
        <IconElm
          className={tremorTwMerge(
            makeSearchSelectClassName("Icon"),
            // common
            "flex-none",
            // light
            "text-tremor-content-subtle",
            // dark
            "dark:text-dark-tremor-content-subtle",
            sizing.lg.height,
            sizing.lg.width,
          )}
        />
      );
    }
  }

  const valueToNameMapping = useMemo(() => constructValueToNameMapping(children), [children]);
  const filteredOptions = useMemo(
    () => getFilteredOptions(searchQuery, children as React.ReactElement[]),
    [searchQuery, children],
  );

  const handleReset = () => {
    setSelectedValue("");
    setSearchQuery("");
    onValueChange?.("");
  };

  return (
    <Combobox
      as="div"
      ref={ref}
      defaultValue={selectedValue}
      value={selectedValue}
      onChange={
        ((value: string) => {
          onValueChange?.(value);
          setSelectedValue(value);
        }) as any
      }
      disabled={disabled}
      className={tremorTwMerge(
        // common
        "w-full min-w-[10rem] relative text-tremor-default",
        className,
      )}
      {...other}
    >
      {({ value }) => (
        <>
          <Combobox.Button className="w-full">
            {Icon && (
              <span
                className={tremorTwMerge(
                  "absolute inset-y-0 left-0 flex items-center ml-px",
                  spacing.md.paddingLeft,
                )}
              >
                {Icon}
              </span>
            )}

            <Combobox.Input
              className={tremorTwMerge(
                // common
                "w-full outline-none text-left whitespace-nowrap truncate rounded-tremor-default focus:ring-2 transition duration-100 text-tremor-default pr-14",
                // light
                "border-tremor-border shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted",
                // dark
                "dark:border-dark-tremor-border dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted",
                Icon ? "p-10 -ml-0.5" : spacing.lg.paddingLeft,
                spacing.sm.paddingY,
                border.sm.all,
                disabled
                  ? "placeholder:text-tremor-content-subtle dark:placeholder:text-tremor-content-subtle"
                  : "placeholder:text-tremor-content dark:placeholder:text-tremor-content",
                getSelectButtonColors(hasValue(value), disabled),
              )}
              placeholder={placeholder}
              onChange={(event) => setSearchQuery(event.target.value)}
              displayValue={(value: string) => valueToNameMapping.get(value) ?? ""}
            />
            <div
              className={tremorTwMerge(
                "absolute inset-y-0 right-0 flex items-center",
                spacing.md.paddingRight,
              )}
            >
              <ArrowDownHeadIcon
                className={tremorTwMerge(
                  makeSearchSelectClassName("arrowDownIcon"),
                  // common
                  "flex-none",
                  // light
                  "text-tremor-content-subtle",
                  // dark
                  "dark:text-dark-tremor-content-subtle",
                  sizing.md.height,
                  sizing.md.width,
                )}
              />
            </div>
          </Combobox.Button>
          {enableClear && selectedValue ? (
            <button
              type="button"
              className={tremorTwMerge(
                "absolute inset-y-0 right-0 flex items-center",
                spacing.fourXl.marginRight,
              )}
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
            >
              <XCircleIcon
                className={tremorTwMerge(
                  makeSelectClassName("clearIcon"),
                  // common
                  "flex-none",
                  // light
                  "text-tremor-content-subtle",
                  // dark
                  "dark:text-dark-tremor-content-subtle",
                  sizing.md.height,
                  sizing.md.width,
                )}
              />
            </button>
          ) : null}
          {filteredOptions.length > 0 && (
            <Combobox.Options
              className={tremorTwMerge(
                // common
                "absolute z-10 divide-y overflow-y-auto max-h-[228px] w-full left-0 outline-none rounded-tremor-default text-tremor-default",
                // light
                "bg-tremor-background border-tremor-border divide-tremor-border shadow-tremor-dropdown",
                // dark
                "dark:bg-dark-tremor-background dark:border-dark-tremor-border dark:divide-dark-tremor-border dark:shadow-dark-tremor-dropdown",
                spacing.twoXs.marginTop,
                spacing.twoXs.marginBottom,
                border.sm.all,
              )}
            >
              {filteredOptions}
            </Combobox.Options>
          )}
        </>
      )}
    </Combobox>
  );
});

SearchSelect.displayName = "SearchSelect";

export default SearchSelect;
