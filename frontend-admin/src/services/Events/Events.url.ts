import axiosInstance from "../axiosInstance";

const getEvents = (params: ParamsBody) => {
  const url = `/admin/event-table`;
  return axiosInstance.get(url, { params })
}

const getEventById = (id: string) => {
  const url = `/admin/event-table/${id}`;
  return axiosInstance.get(url)
}

const createEvent = (data: EventBody) => {
  const url = `/admin/create-event`;
  return axiosInstance.post(url, data)
}

const updateEvent = (data: EventBody) => {
  const url = `/admin/update-Event/${data.id}`;
  return axiosInstance.patch(url, data)
}

const deleteEvent = (userId: string) => {
  const url = `/admin/event/${userId}`;
  return axiosInstance.delete(url)
}

const getEventCategories = (params: ParamsBody) => {
  const url = `/admin/event-category-table`;
  return axiosInstance.get(url, {params})
}

const createEventCategory = (body: {name: string}) => {
  const url = `/admin/create-event-category`;
  return axiosInstance.post(url, body)
}

const updateEventCategorty = (data: {name: string}, id: string) => {
  const url = `/admin/update-event-category/${id}`;
  return axiosInstance.patch(url, data)
}

const deleteEventCategory = (id: string) => {
  const url = `/admin/delete-event-category/${id}`;
  return axiosInstance.delete(url)
}

export const EventServices = { 
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventCategories,
  createEventCategory,
  updateEventCategorty,
  deleteEventCategory
}