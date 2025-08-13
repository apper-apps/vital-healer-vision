import { toast } from 'react-toastify';

const caseStudiesService = {
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
      const tableName = 'case_study_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "practice_type_c" } },
          { field: { Name: "practice_name_c" } },
          { field: { Name: "metrics_c" } },
          { field: { Name: "testimonial_c" } },
          { field: { Name: "image_url_c" } }
        ],
        orderBy: [
          {
            fieldName: "practice_name_c",
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
      return response.data.map(item => {
        let metrics = {};
        try {
          metrics = item.metrics_c ? JSON.parse(item.metrics_c) : {};
        } catch (e) {
          // If JSON parsing fails, create empty metrics
          metrics = {};
        }

        return {
          Id: item.Id,
          practiceType: item.practice_type_c,
          practiceName: item.practice_name_c,
          metrics: metrics,
          testimonial: item.testimonial_c,
          imageUrl: item.image_url_c || "/api/placeholder/400/300",
          tags: item.Tags ? item.Tags.split(',').map(t => t.trim()) : []
        };
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching case studies:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'case_study_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "practice_type_c" } },
          { field: { Name: "practice_name_c" } },
          { field: { Name: "metrics_c" } },
          { field: { Name: "testimonial_c" } },
          { field: { Name: "image_url_c" } }
        ]
      };
      
      const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response || !response.data) {
        throw new Error("Case study not found");
      }

      const item = response.data;
      let metrics = {};
      try {
        metrics = item.metrics_c ? JSON.parse(item.metrics_c) : {};
      } catch (e) {
        metrics = {};
      }

      return {
        Id: item.Id,
        practiceType: item.practice_type_c,
        practiceName: item.practice_name_c,
        metrics: metrics,
        testimonial: item.testimonial_c,
        imageUrl: item.image_url_c || "/api/placeholder/400/300",
        tags: item.Tags ? item.Tags.split(',').map(t => t.trim()) : []
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching case study with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(caseStudyData) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'case_study_c';
      
      const params = {
        records: [
          {
            Name: caseStudyData.practiceName || caseStudyData.name,
            Tags: caseStudyData.tags?.join(',') || '',
            practice_type_c: caseStudyData.practiceType,
            practice_name_c: caseStudyData.practiceName,
            metrics_c: JSON.stringify(caseStudyData.metrics || {}),
            testimonial_c: caseStudyData.testimonial,
            image_url_c: caseStudyData.imageUrl
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
          console.error(`Failed to create case studies ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          toast.success('Case study created successfully');
          return successfulRecords[0].data;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating case study:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
    }
  },

  async update(id, updateData) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'case_study_c';
      
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: updateData.practiceName || updateData.name,
            Tags: updateData.tags?.join(',') || '',
            practice_type_c: updateData.practiceType,
            practice_name_c: updateData.practiceName,
            metrics_c: JSON.stringify(updateData.metrics || {}),
            testimonial_c: updateData.testimonial,
            image_url_c: updateData.imageUrl
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
          console.error(`Failed to update case studies ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulUpdates = response.results.filter(result => result.success);
        if (successfulUpdates.length > 0) {
          toast.success('Case study updated successfully');
          return successfulUpdates[0].data;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating case study:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
    }
  },

  async delete(id) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'case_study_c';
      
      const params = {
        RecordIds: [parseInt(id)]
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
          console.error(`Failed to delete case studies ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulDeletions = response.results.filter(result => result.success);
        if (successfulDeletions.length > 0) {
          toast.success('Case study deleted successfully');
          return true;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting case study:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
    }
    
    return false;
  }
};

export default caseStudiesService;