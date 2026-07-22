export type Category = 'Job' | 'Internship' | 'Scholarship' | 'Online course' | 'Remote work' | 'Training program' | 'Volunteer work';
export type OpportunityType = 'Remote' | 'On-site' | 'Hybrid';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: Category;
  location: string;
  type: OpportunityType;
  deadline: string; // ISO String (YYYY-MM-DD)
  description: string;
  requirements: string[];
  applyLink: string;
  tags: string[];
  isFeatured?: boolean;
}