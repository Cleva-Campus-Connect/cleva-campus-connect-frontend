import { campuses } from './mockData'

export const campusService = {
  async list() { return campuses },
  async findBySlug(slug) { return campuses.find((campus) => campus.slug === slug) },
}
