import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Separator } from "@components/ui/separator";
import { cn } from "@lib/utils";
import { Column } from "@tanstack/react-table";
import { NameValue } from "@typings/utils";
import { CheckIcon, ListFilter, PlusCircle } from "lucide-react";

export type FacetedFilterProps<T> = {
  title: string;
  column: Column<T, unknown>;
  options: NameValue[];
};

function FilterButtonContent<T>({
  selectedValues,
  options,
  title,
}: FacetedFilterProps<T> & { selectedValues: Set<string> }) {
  return (
    <>
      <ListFilter className="mr-2 h-4 w-4" />
      {title}
      {selectedValues?.size > 0 && (
        <>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
            {selectedValues.size}
          </Badge>
          <div className="hidden space-x-1 lg:flex">
            {selectedValues.size > 2 ? (
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                {selectedValues.size} selected
              </Badge>
            ) : (
              options
                .filter((option) => selectedValues.has(option.value))
                .map((option) => (
                  <Badge
                    variant="secondary"
                    key={option.value}
                    className="rounded-sm px-1 font-normal"
                  >
                    {option.name}
                  </Badge>
                ))
            )}
          </div>
        </>
      )}
    </>
  );
}

function FilterCommandList<T>({
  column,
  options,
  selectedValues,
  title,
}: FacetedFilterProps<T> & { selectedValues: Set<string> }) {
  const facets = column?.getFacetedUniqueValues();

  return (
    <Command>
      <CommandInput placeholder={title} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => {
            const isSelected = selectedValues.has(option.value);
            return (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  if (isSelected) {
                    selectedValues.delete(option.value);
                  } else {
                    selectedValues.add(option.value);
                  }
                  const filterValues = Array.from(selectedValues);
                  column?.setFilterValue(filterValues.length ? filterValues : undefined);
                }}
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible",
                  )}
                >
                  <CheckIcon className={cn("h-4 w-4")} />
                </div>
                <span>{option.name}</span>
                {facets?.get(option.value) && (
                  <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                    {facets.get(option.value)}
                  </span>
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>
        {selectedValues.size > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => column?.setFilterValue(undefined)}
                className="justify-center text-center"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
}

export default function FacetedFilter<T>({ column, options, title }: FacetedFilterProps<T>) {
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed w-full xl:w-auto"
          data-cy={`${title}-filter`}
        >
          <FilterButtonContent
            column={column}
            options={options}
            selectedValues={selectedValues}
            title={title}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0" align="start">
        <FilterCommandList
          column={column}
          options={options}
          selectedValues={selectedValues}
          title={title}
        />
      </PopoverContent>
    </Popover>
  );
}
