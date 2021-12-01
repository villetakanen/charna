import { StatModel } from './StatModel'

export interface SheetModel {
  name: string // unique identifier for this sheet
  meta?: {
    [key: string]: string // arbitrary metadata
  },
  stats: { [key: string]: StatModel }
}