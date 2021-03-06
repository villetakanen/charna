import { CharacterSheet, Charna } from '../src'

describe('CharacterSheet', () => {
  it('should be defined', () => {
    expect(CharacterSheet).toBeDefined()
  })

  it('should have a constructor', () => {
    expect(CharacterSheet.prototype.constructor).toBeDefined()
  })

  it('should have an id', () => {
    const sheet = new CharacterSheet('test')
    expect(sheet.id).toBeDefined()
    expect(sheet.id).toEqual('test')
  })

  it('initiate a character sheet model', () => {
    const sheet = new CharacterSheet('test')
    expect(sheet.model).toBeDefined()
    const m = { name: 'test', stats: {}}
    sheet.model = m
    expect(sheet.model).toEqual(m) 
  })

  it('should initialize stats for a model', () => {
    const sheet = new CharacterSheet('test')
    const m = { name: 'test', stats: {
      strength: {
        type: 'number'
      },
      dexterity: {
        type: 'number',
        initialValue: 10
      }
    }}
    sheet.model = m
    expect(sheet.getStat('strength')?.value).toEqual(0)
    expect(sheet.getStat('dexterity')?.value).toEqual(10)
  })

  it('should support setting stats, in the sheet-model', () => {
    const sheet = new CharacterSheet('test')
    sheet.model = { name: 'test', stats: {
      strength: {
        type: 'number'
      }
    }}
    sheet.setStat('strength', 1)
    expect(sheet.getStat('strength')?.value).toEqual(1)
  })

  it('should support setting string stats', () => {
    const sheet = new CharacterSheet('test')
    sheet.model = { name: 'test', stats: {
      name: {
        type: 'string'
      }
    }}
    sheet.setStat('name', 'test')
    expect(sheet.getStat('name')?.value).toEqual('test')
  })

  it('should not support setting stats, not in the sheet-model', () => {
    const sheet = new CharacterSheet('test')
    sheet.model = { name: 'test', stats: {}}
    sheet.setStat('invalid', 1)
    expect(sheet.getStat('invalid')).toBeUndefined()
  })

  it('should throw an error when setting a composite stat', () => {
    const sheet = new CharacterSheet('test')
    sheet.model = { name: 'test', stats: {
      strength: {
        type: 'composite'
      }
    }}
    expect(() => sheet.setStat('strength', 1)).toThrow('Cannot set value on a composite stat')
  })

  it('should support setting a model', () => {
    const sheet = new CharacterSheet('test')
    const m = { name: 'test', stats: {
      strength: {
        type: 'number'
      }
    }}
    sheet.model = m
    expect(sheet.model).toEqual(m)
  })

  it('should support setting an empty model', () => {
    const sheet = new CharacterSheet('test')
    const m = { name: 'test', stats: {
      strength: {
        type: 'number'
      }
    }}
    sheet.model = m
    sheet.model = { name: '', stats: {}}
    expect(sheet.model).toEqual({ name: '', stats: {}})
  })

  it ('should not reinitialize a stat', () => {
    const sheet = new CharacterSheet('test')
    sheet.model = { name: 'test', stats: {
      strength: {
        type: 'number',
        initialValue: 10
      }
    }}
    sheet.setStat('strength', 1)
    sheet.model = { name: 'test', stats: {
      strength: {
        type: 'number',
        initialValue: 11
      }
    }}
    expect(sheet.getStat('strength')?.value).toEqual(1)
  })

  it('should support setting a composite stat, with a formula', () => {
    const sheet = new CharacterSheet('test')
    sheet.model = { name: 'test', stats: {
      strength: {
        type: 'composite',
        formula: '2 + 2'
      }
    }}
    expect(sheet.getStat('strength')?.value).toEqual(4)
  })

  it('should support setting a composite stat, with a formula of stats', () => {
    const sheet = new CharacterSheet('test')
    sheet.model = { name: 'test', stats: {
      strength: {
        type: 'composite',
        formula: '10 + dexterity'
      },
      dexterity: {
        type: 'number',
        initialValue: 11
      }
    }}
    expect(sheet.getStat('strength')?.value).toEqual(21)
  })

  it('should distill to consumable json', () => {
    const sheet = new CharacterSheet('test-sheet')
    sheet.model = { name: 'test-sheet-model', stats: {
      strength: {
        type: 'composite',
        formula: '10 + dexterity'
      },
      dexterity: {
        type: 'number',
        initialValue: 11
      }
    }}
    const json = sheet.toJSON()
    expect(json).toEqual({
      id: 'test-sheet',
      sheetModel: 'test-sheet-model',
      stats: { 
        strength: 21,
        dexterity: 11
      }
    })
  })

  it('should support named sheetModels', () => {
    const sheet = new CharacterSheet('test-sheet')
    sheet.model = 'fantasy'
    expect(sheet.model).toEqual(Charna.getSheetModel('fantasy'))
    expect(sheet.getStat('strength')?.value).toEqual(10)
  })
})