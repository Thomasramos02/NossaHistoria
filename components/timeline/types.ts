export type TimelineReaction = {
  id: string
  emoji: string
  count: number
  reacted?: boolean
}

export type TimelineComment = {
  id: string
  author: string
  message: string
  date: string
  avatarUrl?: string
}

export type TimelineEvent = {
  id: string
  title: string
  date: string
  description?: string
  coverUrl?: string
  gallery?: string[]
  location?: string
  tags?: string[]
  isMilestone?: boolean
  reactions?: TimelineReaction[]
  comments?: TimelineComment[]
}

export type TimelineVariant = 'story' | 'feed'

export type TimelineSort = 'asc' | 'desc'

export type TimelineFilterState = {
  query: string
  tag: string
  year: string
  sort: TimelineSort
  onlyMilestones: boolean
}

export const defaultTimelineFilters: TimelineFilterState = {
  query: '',
  tag: 'all',
  year: 'all',
  sort: 'asc',
  onlyMilestones: false,
}
