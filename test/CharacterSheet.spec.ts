import { CharacterSheet } from '../src/charna'

describe('CharacterSheet', () => {
  it('should be defined', () => {
    expect(CharacterSheet).toBeDefined()
  })

  it('should have a constructor', () => {
    expect(CharacterSheet.prototype.constructor).toBeDefined()
  })

  it('initiate a character sheet model', () => {
    const sheet = new CharacterSheet('test')
    expect(sheet.model).toBeDefined()
    const m = { name: 'test', system: 'test', properties: {}, stats: {} }
    sheet.model = m
    expect(sheet.model).toEqual(m) 
  })
})