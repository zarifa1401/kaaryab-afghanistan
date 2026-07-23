import { Opportunity } from '@/types';

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    organization: "Kabul Tech Community",
    category: "Internship",
    location: "Kabul",
    type: "Remote",
    deadline: "2024-07-25", // Change to a future date if testing later
    description: "A beginner-friendly internship for students who know React and Next.js.",
    requirements: ["Basic React", "HTML/CSS", "GitHub"],
    applyLink: "https://example.com/apply",
    tags: ["React", "Next.js", "Internship"],
    isFeatured: true
  },
  {
    id: "2",
    title: "Women in Tech Scholarship",
    organization: "Global Learning Foundation",
    category: "Scholarship",
    location: "Online",
    type: "Remote",
    deadline: "2025-08-10",
    description: "A scholarship opportunity for women who want to study technology online.",
    requirements: ["Basic English", "Motivation letter", "Internet access"],
    applyLink: "https://example.com/scholarship",
    tags: ["Scholarship", "Women", "Online"],
    isFeatured: true
  },
  {
    id: "3",
    title: "Junior UI/UX Designer",
    organization: "Afghan Creatives",
    category: "Job",
    location: "Herat",
    type: "On-site",
    deadline: "2024-12-15",
    description: "Looking for a creative junior designer to join our growing team in Herat.",
    requirements: ["Figma", "Adobe XD", "Portfolio"],
    applyLink: "https://example.com/design-job",
    tags: ["UI/UX", "Design", "Figma"]
  },
  {
    id: "4",
    title: "Digital Marketing Training",
    organization: "SkillBuild Afghanistan",
    category: "Training program",
    location: "Online",
    type: "Remote",
    deadline: "2024-06-30", // Expiring soon!
    description: "A 4-week intensive training program on SEO and social media marketing.",
    requirements: ["Laptop", "Internet", "Commitment"],
    applyLink: "https://example.com/training",
    tags: ["Marketing", "SEO", "Training"]
  }
];