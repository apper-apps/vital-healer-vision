import { toast } from 'react-toastify';

const contactService = {
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
      const tableName = 'contact_submission_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "submitted_at_c" } },
          { field: { Name: "status_c" } }
        ],
        orderBy: [
          {
            fieldName: "submitted_at_c",
            sorttype: "DESC"
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
        name: item.Name,
        submittedAt: item.submitted_at_c,
        status: item.status_c || 'pending',
        tags: item.Tags ? item.Tags.split(',').map(t => t.trim()) : []
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching contact submissions:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'contact_submission_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "submitted_at_c" } },
          { field: { Name: "status_c" } }
        ]
      };
      
      const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response || !response.data) {
        throw new Error("Contact submission not found");
      }

      const item = response.data;
      return {
        Id: item.Id,
        name: item.Name,
        submittedAt: item.submitted_at_c,
        status: item.status_c || 'pending',
        tags: item.Tags ? item.Tags.split(',').map(t => t.trim()) : []
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching contact submission with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(submissionData) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'contact_submission_c';
      
      const params = {
        records: [
          {
            Name: submissionData.name || `${submissionData.firstName} ${submissionData.lastName}`.trim(),
            Tags: submissionData.tags?.join(',') || '',
            submitted_at_c: new Date().toISOString(),
            status_c: submissionData.status || 'pending'
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
          console.error(`Failed to create contact submissions ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          toast.success('Contact submission created successfully');
          return successfulRecords[0].data;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating contact submission:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
    }
  },

  async update(id, updateData) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'contact_submission_c';
      
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: updateData.name,
            Tags: updateData.tags?.join(',') || '',
            status_c: updateData.status
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
          console.error(`Failed to update contact submissions ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulUpdates = response.results.filter(result => result.success);
        if (successfulUpdates.length > 0) {
          toast.success('Contact submission updated successfully');
          return successfulUpdates[0].data;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating contact submission:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
    }
  },

  async delete(id) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'contact_submission_c';
      
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
          console.error(`Failed to delete contact submissions ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulDeletions = response.results.filter(result => result.success);
        if (successfulDeletions.length > 0) {
          toast.success('Contact submission deleted successfully');
          return true;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting contact submission:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
    }
    
    return false;
  }
};

export default contactService;