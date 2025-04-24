import axiosInstance from "../axiosInstance";

const createGameClient = (data: { image: string; title: string; url: string }) => {
  const url = `/GameClient`;
  return axiosInstance.post(url, data);
};

const updateGameClient = (uuid: string, data: { image: string; title: string; url: string }) => {
  const url = `/GameClient/${uuid}`;
  return axiosInstance.put(url, data);
};

const getAllGameClients = () => {
  const url = `/GameClient`;
  return axiosInstance.get(url);
};

export const GameClientServices = {
  createGameClient,
  updateGameClient,
  getAllGameClients,
};