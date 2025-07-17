import servicesData from "@/services/mockData/services.json";

const servicesService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...servicesData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const service = servicesData.find(item => item.id === id);
    if (!service) {
      throw new Error("Service not found");
    }
    return { ...service };
  },

  async create(serviceData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...servicesData.map(item => item.Id)) + 1;
    const newService = {
      ...serviceData,
      Id: newId,
      id: serviceData.name.toLowerCase().replace(/\s+/g, "-")
    };
    servicesData.push(newService);
    return { ...newService };
  },

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = servicesData.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("Service not found");
    }
    servicesData[index] = { ...servicesData[index], ...updateData };
    return { ...servicesData[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = servicesData.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("Service not found");
    }
    const deletedService = servicesData.splice(index, 1)[0];
    return { ...deletedService };
  }
};

export default servicesService;