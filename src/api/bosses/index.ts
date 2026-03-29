export interface Boss {
  id: string
  name: string
  image: string
  description: string
  location: string
  drops: string[]
  healthPoints: number
}

export async function getBosses(): Promise<Boss[]> {
  try {
    const res = await fetch('https://eldenring.fanapis.com/api/bosses?limit=100')
    const data = await res.json()

    if (!data.data) return []

    const bosses: Boss[] = data.data.map((boss: any) => {
      let hp = 0
      if (typeof boss.healthPoints === 'string') {
        hp = parseInt(boss.healthPoints.replace(/,/g, '')) || 0
      } else if (typeof boss.healthPoints === 'number') {
        hp = boss.healthPoints
      }

      return {
        id: boss.id,
        name: boss.name,
        image: boss.image,
        description: boss.description,
        location: boss.location,
        drops: boss.drops || [],
        healthPoints: hp,
      }
    })
    return bosses
  } catch (error) {
    console.error('Failed to fetch bosses:', error)
    return []
  }
}

export async function getBoss(id: string): Promise<Boss | null> {
  try {
    const res = await fetch(`https://eldenring.fanapis.com/api/bosses/${id}`)
    const data = await res.json()

    if (!data.data) return null
    const boss = data.data

    let hp = 0
    if (typeof boss.healthPoints === 'string') {
      hp = parseInt(boss.healthPoints.replace(/,/g, '')) || 0
    } else if (typeof boss.healthPoints === 'number') {
      hp = boss.healthPoints
    }

    return {
      id: boss.id,
      name: boss.name,
      image: boss.image,
      description: boss.description,
      location: boss.location,
      drops: boss.drops || [],
      healthPoints: hp,
    }
  } catch (error) {
    console.error(`Failed to fetch boss ${id}:`, error)
    return null
  }
}
