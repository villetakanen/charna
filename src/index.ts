
import { CharacterSheet } from './CharacterSheet'
import { SheetModel } from './models/SheetModel'
import basicSheet from './sheets/basic.sheet.json'
import fantasySheet from './sheets/fantasy.sheet.json'

class Charna {
  private static _sheets: Map<string, SheetModel> = new Map()
  public static debugMode = false

  public static useSheetModel (id:string, model: SheetModel): void {
    if (Charna._sheets.has(id)) {
      console.warn(`Sheet with id ${id} already exists, replacing it might cause unexpected behavior`)
    }
    Charna._sheets.set(id, model)
  }

  public static getSheetModel (id:string): SheetModel|undefined {
    return Charna._sheets.get(id)
  }
}

Charna.useSheetModel('basic', basicSheet)
Charna.useSheetModel('fantasy', fantasySheet)

export {
  Charna,
  CharacterSheet
}
