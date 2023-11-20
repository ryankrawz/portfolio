import { ProjectType } from '../enums/ProjectType';

export interface Project {
  name: string;
  description: string;
  tags: string[];
  type: ProjectType;
  link: string;
}
