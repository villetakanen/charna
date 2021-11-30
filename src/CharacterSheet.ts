import { SheetModel} from './models/SheetModel'
import { StatModel } from './models/StatModel'
import { evaluate } from 'mathjs'
import { logDebug } from './utils/logger'

export class Stat implements StatModel{
  type: string
  private _value: number|string|undefined
  private _isComposite: boolean
  formula?: string | undefined;
  _sheet: CharacterSheet

  constructor(sheet:CharacterSheet, type:string, initilaValue?:number|string) {
    this.type = type
    this._isComposite = type === 'composite'
    this._sheet = sheet
    if (typeof initilaValue !== 'undefined') {
      this.value = initilaValue
    } 
  }

  get value(): number|string {
    if (this._isComposite) return this.evalCompoundStat()
    if (this.type === 'number') {
      if (this._value === undefined) return 0
      return this._value as number
    }
    return this._value as string
  }

  set value(value:number|string) {
    if (this._isComposite) {
      throw new Error('Cannot set value on a composite stat')
    }
    if (this.type === 'number') {
      this._value = value as number
    }
    else if (this.type === 'string') {
      this._value = value as string
    }
  }

  private evalCompoundStat (): number {
    logDebug('Evaluating compound stat', this.formula)
    let formula = this.formula || '-1'
    this._sheet.statKeys().forEach(key => {
      if (this._sheet.getStat(key)?.type === 'composite') return
      formula = formula.replace(key, ''+ (this._sheet.getStat(key)?.value || 0))
    })
    return evaluate(formula)
  }
}

/**
 * A model for a character sheet. 
 * 
 * Stats are stored in a map of stat names to Stat objects.
 * 
 * The sheet is identified by a unique id.
 * 
 * The sheet can be serialized to a JSON object.
 */
export class CharacterSheet {
  id: string
  private _model: SheetModel = { id: '', stats: {} }
  private _stats: Map<string, Stat> = new Map()
  
  constructor(id: string) {
    this.id = id
  }
  
  public getStat (statName: string): Stat|undefined{
    return this._stats.get(statName)
  }

  public setStat (statName: string, value: number|string): void {
    if (!this._stats.has(statName)) return
    const stat = this._stats.get(statName)
    if (stat) stat.value = value
  }
  
  set model(model: SheetModel) {
    this._model = model
    this.initializeStats()
  }

  get model(): SheetModel{
    return this._model
  }

  statKeys (): string[] {
    return Array.from(this._stats.keys())
  }

  private initializeStats() {
    Object.keys(this._model.stats).forEach(statName => {
      if (this._stats.has(statName)) return

      const modelStat = this._model.stats[statName]

      // Create a character stat for each stat in the current model
      const stat = new Stat(
        this,
        modelStat.type
      )
      if (modelStat.initialValue) stat.value = modelStat.initialValue
      if (modelStat.formula) stat.formula = modelStat.formula
      this._stats.set(statName, stat)
    })
  }

  toJSON () {

    const stats: {[key: string]: string|number } = {} 
    this.statKeys().forEach(key => {
      stats[key] = this.getStat(key)?.value || 0
    })

    return {
      id: this.id,
      sheetModel: this._model.id,
      stats: stats
    }
  }
}
