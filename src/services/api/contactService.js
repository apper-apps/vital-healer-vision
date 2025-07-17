let contactSubmissions = [];

const contactService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...contactSubmissions];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const submission = contactSubmissions.find(item => item.Id === parseInt(id));
    if (!submission) {
      throw new Error("Contact submission not found");
    }
    return { ...submission };
  },

  async create(submissionData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newId = contactSubmissions.length > 0 
      ? Math.max(...contactSubmissions.map(item => item.Id)) + 1 
      : 1;
    
    const newSubmission = {
      ...submissionData,
      Id: newId,
      submittedAt: new Date().toISOString(),
      status: "pending"
    };
    
    contactSubmissions.push(newSubmission);
    return { ...newSubmission };
  },

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = contactSubmissions.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Contact submission not found");
    }
    contactSubmissions[index] = { ...contactSubmissions[index], ...updateData };
    return { ...contactSubmissions[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = contactSubmissions.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Contact submission not found");
    }
    const deletedSubmission = contactSubmissions.splice(index, 1)[0];
    return { ...deletedSubmission };
  }
};

export default contactService;