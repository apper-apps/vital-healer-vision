import { toast } from 'react-toastify';

const servicesService = {
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
      const tableName = 'service_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "description_c" } },
          { field: { Name: "icon_c" } },
          { field: { Name: "features_c" } },
          { field: { Name: "benefits_c" } }
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
        description: item.description_c,
        icon: item.icon_c,
        features: item.features_c ? item.features_c.split('\n').filter(f => f.trim()) : [],
        benefits: item.benefits_c ? item.benefits_c.split('\n').filter(b => b.trim()) : [],
        tags: item.Tags ? item.Tags.split(',').map(t => t.trim()) : []
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching services:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'service_c';
      
      // First get all services and find by slug
      const allServices = await this.getAll();
      const service = allServices.find(item => item.id === id);
      
      if (!service) {
        throw new Error("Service not found");
      }
      
      return service;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching service with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(serviceData) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'service_c';
      
      const params = {
        records: [
          {
            Name: serviceData.name,
            Tags: serviceData.tags?.join(',') || '',
            description_c: serviceData.description,
            icon_c: serviceData.icon,
            features_c: serviceData.features?.join('\n') || '',
            benefits_c: serviceData.benefits?.join('\n') || ''
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
          console.error(`Failed to create services ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          toast.success('Service created successfully');
          return successfulRecords[0].data;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating service:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
    }
  },

  async update(id, updateData) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'service_c';
      
      // Get the record by database ID first
      const allServices = await this.getAll();
      const service = allServices.find(item => item.id === id);
      
      if (!service) {
        throw new Error("Service not found");
      }
      
      const params = {
        records: [
          {
            Id: service.Id,
            Name: updateData.name,
            Tags: updateData.tags?.join(',') || '',
            description_c: updateData.description,
            icon_c: updateData.icon,
            features_c: updateData.features?.join('\n') || '',
            benefits_c: updateData.benefits?.join('\n') || ''
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
          console.error(`Failed to update services ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulUpdates = response.results.filter(result => result.success);
        if (successfulUpdates.length > 0) {
          toast.success('Service updated successfully');
          return successfulUpdates[0].data;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating service:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
    }
  },

  async delete(id) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'service_c';
      
      // Get the record by database ID first
      const allServices = await this.getAll();
      const service = allServices.find(item => item.id === id);
      
      if (!service) {
        throw new Error("Service not found");
      }
      
      const params = {
        RecordIds: [service.Id]
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
          console.error(`Failed to delete services ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulDeletions = response.results.filter(result => result.success);
        if (successfulDeletions.length > 0) {
          toast.success('Service deleted successfully');
          return true;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting service:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
    }
    
    return false;
  }
};

export default servicesService;