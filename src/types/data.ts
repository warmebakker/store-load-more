export interface PaginatedResponse<T> {
  items: T[]
  index: number
  size: number
}

export interface SpaceObject {
  id: number
  launchYear: Date
  name: string
  objectiveSummary: string
}

export type Guid = string;

export type UserIdentifier = {
  key: Guid;
};

export interface UserFavorite {
  favorite: boolean
}