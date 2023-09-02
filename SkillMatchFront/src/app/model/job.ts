import {User} from "./user";

export interface Job{
  ID: string
  Title: string
  Description: string
  Company: string
  Location: string
  Salary: string
  Requirements: Requirement[]
  ApplicantUsernames: string[]
}

export interface Requirement{
  Skill: string
  Min: number
  Max: number
}
