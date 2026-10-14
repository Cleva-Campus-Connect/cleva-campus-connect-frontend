import { events } from './mockData'

export const eventService = {
  async list() { return events },
  async findBySlug(slug) { return events.find((event) => event.slug === slug) },
}
