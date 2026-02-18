"use client";

import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { TimelineFilterState } from "./types";

type TimelineFiltersProps = {
  filters: TimelineFilterState;
  tags: string[];
  years: string[];
  onChange: (filters: TimelineFilterState) => void;
  className?: string;
};

const buildFilterLabel = (filters: TimelineFilterState) => {
  const labels: string[] = [];
  if (filters.query) labels.push(`Busca: "${filters.query}"`);
  if (filters.tag !== "all") labels.push(`Tag: ${filters.tag}`);
  if (filters.year !== "all") labels.push(`Ano: ${filters.year}`);
  if (filters.onlyMilestones) labels.push("Somente marcos");
  labels.push(filters.sort === "asc" ? "Ordem: antigas" : "Ordem: recentes");
  return labels;
};

export function TimelineFilters({
  filters,
  tags,
  years,
  onChange,
  className,
}: TimelineFiltersProps) {
  const hasActiveFilters =
    filters.query ||
    filters.tag !== "all" ||
    filters.year !== "all" ||
    filters.onlyMilestones ||
    filters.sort !== "asc";

  const labels = buildFilterLabel(filters);

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/5 bg-neutral-950/40 p-4 shadow-[0_20px_50px_-40px_rgba(239,68,68,0.6)]",
        className
      )}
    >
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(160px,200px)_minmax(140px,180px)]">
        <label className="relative">
          <span className="sr-only">Buscar</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <Input
            value={filters.query}
            onChange={(event) =>
              onChange({ ...filters, query: event.target.value })
            }
            placeholder="Buscar por título, local ou tag"
            className="h-11 border-white/10 bg-neutral-950/60 pl-9 text-neutral-200 placeholder:text-neutral-500"
          />
        </label>

        <Select
          value={filters.tag}
          onValueChange={(value) => onChange({ ...filters, tag: value })}
        >
          <SelectTrigger className="h-11 border-white/10 bg-neutral-950/60 text-neutral-200">
            <SelectValue placeholder="Todas as tags" />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-neutral-950 text-neutral-200">
            <SelectItem value="all">Todas as tags</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.year}
          onValueChange={(value) => onChange({ ...filters, year: value })}
        >
          <SelectTrigger className="h-11 border-white/10 bg-neutral-950/60 text-neutral-200">
            <SelectValue placeholder="Todos os anos" />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-neutral-950 text-neutral-200">
            <SelectItem value="all">Todos os anos</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <ToggleGroup
          type="single"
          value={filters.sort}
          onValueChange={(value) => {
            if (!value) return;
            onChange({ ...filters, sort: value as TimelineFilterState["sort"] });
          }}
          className="rounded-lg border border-white/10 bg-neutral-950/60 p-1"
        >
          <ToggleGroupItem
            value="asc"
            className="rounded-md text-xs text-neutral-200 data-[state=on]:bg-red-500/20 data-[state=on]:text-red-100"
          >
            Mais antigas
          </ToggleGroupItem>
          <ToggleGroupItem
            value="desc"
            className="rounded-md text-xs text-neutral-200 data-[state=on]:bg-red-500/20 data-[state=on]:text-red-100"
          >
            Mais recentes
          </ToggleGroupItem>
        </ToggleGroup>

        <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-neutral-950/60 px-3 py-2 text-xs text-neutral-200">
          <Switch
            checked={filters.onlyMilestones}
            onCheckedChange={(checked) =>
              onChange({ ...filters, onlyMilestones: checked })
            }
            className="data-[state=checked]:bg-red-500"
          />
          Somente marcos
        </label>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs text-neutral-300 hover:text-white"
            onClick={() =>
              onChange({
                query: "",
                tag: "all",
                year: "all",
                sort: "asc",
                onlyMilestones: false,
              })
            }
          >
            Limpar filtros
          </Button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {labels.map((label) => (
          <Badge
            key={label}
            variant="outline"
            className="border-white/10 text-[0.65rem] uppercase tracking-[0.2em] text-neutral-300"
          >
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
