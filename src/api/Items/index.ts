export interface Item {
  id: string
  name: string
  image: string
  description: string
  type: string
  effect: string
}

export async function getItems(): Promise<Item[]> {
  try {
    const res = await fetch('https://eldenring.fanapis.com/api/items?limit=100')
    const data = await res.json()

    if (!data.data) return []

    const items: Item[] = data.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      description: item.description,
      type: item.type,
      effect: item.effect,
    }))
    return items
  } catch (error) {
    console.error('Failed to fetch items:', error)
    return []
  }
}

export async function getItem(id: string): Promise<Item | null> {
  try {
    const res = await fetch(`https://eldenring.fanapis.com/api/items/${id}`)
    const data = await res.json()

    if (!data.data) return null
    const item = data.data

    return {
      id: item.id,
      name: item.name,
      image: item.image,
      description: item.description,
      type: item.type,
      effect: item.effect,
    }
  } catch (error) {
    console.error(`Failed to fetch item ${id}:`, error)
    return null
  }
}
