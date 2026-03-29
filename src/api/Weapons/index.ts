export interface Weapon {
  id: string
  name: string
  image: string
  description: string
  category: string
  weight: number
  attack: { name: string; amount: number }[]
  defence: { name: string; amount: number }[]
  requiredAttributes: { name: string; amount: number }[]
  scalesWith: { name: string; scaling: string }[]
}

export async function getWeapons(): Promise<Weapon[]> {
  try {
    const res = await fetch('https://eldenring.fanapis.com/api/weapons?limit=200')
    const data = await res.json()

    if (!data.data) return []

    const weapons: Weapon[] = data.data.map((weapon: any) => ({
      id: weapon.id,
      name: weapon.name,
      image: weapon.image,
      description: weapon.description,
      category: weapon.category,
      weight: weapon.weight,
      attack:
        weapon.attack && weapon.attack.length > 0
          ? [{ name: weapon.attack[0].name, amount: weapon.attack[0].amount }]
          : [],
      defence:
        weapon.defence && weapon.defence.length > 0
          ? [{ name: weapon.defence[0].name, amount: weapon.defence[0].amount }]
          : [],
      requiredAttributes:
        weapon.requiredAttributes && weapon.requiredAttributes.length > 0
          ? [
              {
                name: weapon.requiredAttributes[0].name,
                amount: weapon.requiredAttributes[0].amount,
              },
            ]
          : [],
      scalesWith:
        weapon.scalesWith && weapon.scalesWith.length > 0
          ? [{ name: weapon.scalesWith[0].name, scaling: weapon.scalesWith[0].scaling }]
          : [],
    }))
    return weapons
  } catch (error) {
    console.error('Failed to fetch weapons:', error)
    return []
  }
}

export async function getWeapon(id: string): Promise<Weapon | null> {
  try {
    const res = await fetch(`https://eldenring.fanapis.com/api/weapons/${id}`)
    const data = await res.json()

    if (!data.data) return null
    const weapon = data.data

    return {
      id: weapon.id,
      name: weapon.name,
      image: weapon.image,
      description: weapon.description,
      category: weapon.category,
      weight: weapon.weight,
      attack:
        weapon.attack && weapon.attack.length > 0
          ? [{ name: weapon.attack[0].name, amount: weapon.attack[0].amount }]
          : [],
      defence:
        weapon.defence && weapon.defence.length > 0
          ? [{ name: weapon.defence[0].name, amount: weapon.defence[0].amount }]
          : [],
      requiredAttributes:
        weapon.requiredAttributes && weapon.requiredAttributes.length > 0
          ? [
              {
                name: weapon.requiredAttributes[0].name,
                amount: weapon.requiredAttributes[0].amount,
              },
            ]
          : [],
      scalesWith:
        weapon.scalesWith && weapon.scalesWith.length > 0
          ? [{ name: weapon.scalesWith[0].name, scaling: weapon.scalesWith[0].scaling }]
          : [],
    }
  } catch (error) {
    console.error(`Failed to fetch weapon ${id}:`, error)
    return null
  }
}
