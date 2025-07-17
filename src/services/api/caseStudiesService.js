import caseStudiesData from "@/services/mockData/caseStudies.json";

const caseStudiesService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...caseStudiesData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const caseStudy = caseStudiesData.find(item => item.Id === parseInt(id));
    if (!caseStudy) {
      throw new Error("Case study not found");
    }
    return { ...caseStudy };
  },

  async create(caseStudyData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...caseStudiesData.map(item => item.Id)) + 1;
    const newCaseStudy = {
      ...caseStudyData,
      Id: newId
    };
    caseStudiesData.push(newCaseStudy);
    return { ...newCaseStudy };
  },

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = caseStudiesData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Case study not found");
    }
    caseStudiesData[index] = { ...caseStudiesData[index], ...updateData };
    return { ...caseStudiesData[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = caseStudiesData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Case study not found");
    }
    const deletedCaseStudy = caseStudiesData.splice(index, 1)[0];
    return { ...deletedCaseStudy };
  }
};

export default caseStudiesService;