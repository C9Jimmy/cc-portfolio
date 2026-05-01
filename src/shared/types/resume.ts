export interface Profile {
  name: string
  nameEn: string
  titles: string[]
  location: string
  email: string
  social: SocialLink[]
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'codepen' | 'instagram' | 'line'
  label: string
  url: string
  icon: string
}

export interface ExpItem {
  period: string
  duration: string
  role: string
  company: string
  industry: string
  description: string
  chips: string[]
}

export interface ProjectItem {
  idx: string
  title: string
  meta: string
  url?: string
  featured?: boolean
}

export interface ProjectCard {
  type: string
  name: string
  year: string
  icon: string
  bg: string
  url?: string
  desc: string
  tags: string[]
}

export interface SkillGroup {
  label: string
  chips: SkillChip[]
}

export interface SkillChip {
  name: string
  highlight?: boolean
}

export interface VisualItem {
  src: string
  alt: string
  backTitle?: string
  backDesc?: string
}
