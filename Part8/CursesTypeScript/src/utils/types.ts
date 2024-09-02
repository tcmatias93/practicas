//Esta es una interface que tienen todos en comun por lo tanto puedo extenderla a los demas
export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBaseAndDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartBaseAndDescription {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartBaseAndDescription {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartSpecial extends CoursePartBaseAndDescription {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
