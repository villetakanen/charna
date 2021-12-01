# Charna

Typed Character sheet model for pen-and-paper role playing games

## ALPHA RELEASE

Please note, the internals, or API of this module might change unexpectly between major and minor releases, untill further notice.

As the API and model structures stabilize, we'll move to full semver practice, flagging breaking changes with major releases.

## Installation

```bash
npm install charna
```

## Usage

Basic usage

```typescript
import { CharacterSheet } from 'charna'

const sheet = new CharacterSheet('id of the sheet')
sheet.setModel('basic')
// Good to go.
```
