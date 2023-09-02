export interface Job{
  ID: string
  Title: string
  Description: string
  Company: string
  Location: string
  Salary: string
  Requirements: Requirement[]
}

export interface Requirement{
  Skill: string
  Min: number
  Max: number
}
