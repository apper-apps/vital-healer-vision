import { toast } from 'react-toastify';

const industriesService = {
  // Initialize ApperClient for database operations
  getApperClient() {
    const { ApperClient } = window.ApperSDK;
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  },

  async getAll() {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'industry_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "challenges_c" } },
          { field: { Name: "solutions_c" } },
          { field: { Name: "case_study_id_c" } }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match UI expectations
      return response.data.map(item => ({
        Id: item.Id,
        id: item.Name?.toLowerCase().replace(/\s+/g, "-") || '',
        name: item.Name,
        challenges: item.challenges_c ? item.challenges_c.split('\n').filter(c => c.trim()) : [],
        solutions: item.solutions_c ? item.solutions_c.split('\n').filter(s => s.trim()) : [],
        caseStudyId: item.case_study_id_c?.Id?.toString() || item.case_study_id_c?.toString() || null,
        tags: item.Tags ? item.Tags.split(',').map(t => t.trim()) : []
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching industries:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = this.getApperClient();
      
      // First get all industries and find by slug
      const allIndustries = await this.getAll();
      const industry = allIndustries.find(item => item.id === id);
      
      if (!industry) {
        throw new Error("Industry not found");
      }
      
      return industry;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching industry with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(industryData) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'industry_c';
      
      const params = {
        records: [
          {
            Name: industryData.name,
            Tags: industryData.tags?.join(',') || '',
            challenges_c: industryData.challenges?.join('\n') || '',
            solutions_c: industryData.solutions?.join('\n') || '',
            case_study_id_c: industryData.caseStudyId ? parseInt(industryData.caseStudyId) : null
          }
        ]
      };
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create industries ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          toast.success('Industry created successfully');
          return successfulRecords[0].data;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating industry:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
    }
  },

  async update(id, updateData) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'industry_c';
      
      // Get the record by database ID first
      const allIndustries = await this.getAll();
      const industry = allIndustries.find(item => item.id === id);
      
      if (!industry) {
        throw new Error("Industry not found");
      }
      
      const params = {
        records: [
          {
            Id: industry.Id,
            Name: updateData.name,
            Tags: updateData.tags?.join(',') || '',
            challenges_c: updateData.challenges?.join('\n') || '',
            solutions_c: updateData.solutions?.join('\n') || '',
            case_study_id_c: updateData.caseStudyId ? parseInt(updateData.caseStudyId) : null
          }
        ]
      };
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update industries ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulUpdates = response.results.filter(result => result.success);
        if (successfulUpdates.length > 0) {
          toast.success('Industry updated successfully');
          return successfulUpdates[0].data;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating industry:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
    }
  },

  async delete(id) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'industry_c';
      
      // Get the record by database ID first
      const allIndustries = await this.getAll();
      const industry = allIndustries.find(item => item.id === id);
      
      if (!industry) {
        throw new Error("Industry not found");
      }
      
      const params = {
        RecordIds: [industry.Id]
      };
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete industries ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulDeletions = response.results.filter(result => result.success);
        if (successfulDeletions.length > 0) {
          toast.success('Industry deleted successfully');
          return true;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting industry:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
    }
    
    return false;
  }
};

export default industriesService;