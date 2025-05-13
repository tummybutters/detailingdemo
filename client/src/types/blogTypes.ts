// Blog Post Content Types
export interface ParagraphSection {
  type: 'paragraph';
  content: string;
}

export interface HeadingSection {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
}

export interface ListSection {
  type: 'list';
  items: string[];
}

export interface ImageSection {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
}

export interface QuoteSection {
  type: 'quote';
  content: string;
  author?: string;
}

export interface ComponentSection {
  type: 'component';
  name: string;
  props?: Record<string, any>;
}

export type ContentSection = 
  | ParagraphSection 
  | HeadingSection 
  | ListSection 
  | ImageSection 
  | QuoteSection
  | ComponentSection;

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  // Required fields
  slug: string;
  title: string;
  metaDescription: string;
  date: string; // ISO date string
  content: ContentSection[] | string; // Allow raw HTML or structured content
  
  // Optional fields
  excerpt?: string;
  coverImage?: string;
  readTime?: number;
  categories?: string[];
  tags?: string[];
  author?: string;
  serviceLink?: string; // Link to related service page
  uiComponent?: string; // Special UI component to include
  faqSchema?: FAQ[]; // FAQ items for schema markup
}