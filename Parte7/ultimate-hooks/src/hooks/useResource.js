import { useState, useEffect } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = async () => {
    const request = await axios.get(baseUrl);
    setResources(request.data);
  };

  useEffect(() => {
    getAll();
  }, [baseUrl]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    getAll();
    return response.data;
  };
  const service = {
    create,
  };

  return [resources, service];
};

export default useResource;
