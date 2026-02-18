"use client";

import type { ReactNode } from "react";
import type { TimelineEvent, TimelineFilterState } from "./types";
import { TimelineFeed } from "./TimelineFeed";
import { TimelineStory } from "./TimelineStory";

type TimelineStoryProps = {
  variant: "story";
  items: TimelineEvent[];
  className?: string;
  activeIndex?: number;
  onActiveChange?: (index: number, item: TimelineEvent) => void;
  density?: "compact" | "comfortable";
  specialKeywords?: string[];
  showStartMarker?: boolean;
};

type TimelineFeedProps = {
  variant: "feed";
  items: TimelineEvent[];
  className?: string;
  filters?: TimelineFilterState;
  onFilterChange?: (filters: TimelineFilterState) => void;
  onActiveChange?: (index: number, item: TimelineEvent) => void;
  onEdit?: (item: TimelineEvent) => void;
  onDelete?: (item: TimelineEvent) => void;
  onReact?: (item: TimelineEvent, reactionId: string) => void;
  onCommentAdd?: (item: TimelineEvent, message: string) => void;
  onCreate?: () => void;
  renderMedia?: (item: TimelineEvent) => ReactNode;
  renderActions?: (item: TimelineEvent) => ReactNode;
};

export type TimelineProps = TimelineStoryProps | TimelineFeedProps;

export function Timeline(props: TimelineProps) {
  if (props.variant === "story") {
    const { variant: _, ...rest } = props;
    return <TimelineStory {...rest} />;
  }

  const { variant: _, ...rest } = props;
  return <TimelineFeed {...rest} />;
}
