import { CharacterSheet } from '../src/charna'

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
    const m = { id: 'test', stats: {}}
    sheet.model = m
    expect(sheet.model).toEqual(m) 
  })

  it('should initialize stats for a model', () => {
    const sheet = new CharacterSheet('test')
    const m = { id: 'test', stats: {
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
    sheet.model = { id: 'test', stats: {
      strength: {
        type: 'number'
      }
    }}
    sheet.setStat('strength', 1)
    expect(sheet.getStat('strength')?.value).toEqual(1)
  })

  it('should not support setting stats, not in the sheet-model', () => {
    const sheet = new CharacterSheet('test')
    sheet.model = { id: 'test', stats: {}}
    sheet.setStat('invalid', 1)
    expect(sheet.getStat('invalid')).toBeUndefined()
  })
})