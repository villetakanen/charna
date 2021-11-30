import { StatModel } from './StatModel'

export interface SheetModel {
  id: string // unique identifier for this sheet
  meta?: {
    system?: string // system identifier
    game?: string // game identifier
    player?: string // player identifier
  },
  stats: { [key: string]: StatModel }
}