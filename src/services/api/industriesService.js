import industriesData from "@/services/mockData/industries.json";

const industriesService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...industriesData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const industry = industriesData.find(item => item.id === id);
    if (!industry) {
      throw new Error("Industry not found");
    }
    return { ...industry };
  },

  async create(industryData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...industriesData.map(item => item.Id)) + 1;
    const newIndustry = {
      ...industryData,
      Id: newId,
      id: industryData.name.toLowerCase().replace(/\s+/g, "-")
    };
    industriesData.push(newIndustry);
    return { ...newIndustry };
  },

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = industriesData.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("Industry not found");
    }
    industriesData[index] = { ...industriesData[index], ...updateData };
    return { ...industriesData[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = industriesData.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("Industry not found");
    }
    const deletedIndustry = industriesData.splice(index, 1)[0];
    return { ...deletedIndustry };
  }
};

export default industriesService;