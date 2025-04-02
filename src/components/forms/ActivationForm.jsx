import React, { useState, useEffect } from 'react';
import { Settings, Calendar, User, Phone, Building, MapPin } from 'lucide-react';
import FormInput from '../common/FormInput';
import Dropdown from '../common/Dropdown';
import Button from '../common/Button';

/**
 * ActivationForm component for creating and editing activations
 * 
 * @param {object} initialData - Initial form data
 * @param {function} onSubmit - Function to call when form is submitted
 * @param {function} onCancel - Function to call when form is cancelled
 * @param {boolean} isEdit - Whether the form is in edit mode
 * @param {boolean} loading - Whether the form is loading
 * @param {boolean} saving - Whether the form is saving
 * @param {Array} buildingOptions - Building options for dropdown
 * @param {Array} serviceInstallerOptions - Service installer options for dropdown
 */
const ActivationForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  isEdit = false,
  loading = false,
  saving = false,
  buildingOptions = [],
  serviceInstallerOptions = [],
}) => {
  // Form state
  const [formData, setFormData] = useState({
    trbnNo: '',
    orderType: 'ACTIVATION',
    orderSubType: '',
    appointmentDate: '',
    productType: '',
    customerName: '',
    address: '',
    contactNo: '',
    block: '',
    level: '',
    unit: '',
    receivedDate: '',
    buildingName: '',
    buildingType: '',
    status: 'NOT COMPLETED',
    serviceInstaller: '',
    amount: '',
    splitterNumber: '',
    splitterLevel: '',
    portNumber: '',
    solution: '',
    ...initialData
  });
  
  // Order type options
  const orderTypeOptions = [
    { value: 'ACTIVATION', label: 'Activation' },
    { value: 'MODIFICATION', label: 'Modification' },
    { value: 'VAS', label: 'VAS' }
  ];
  
  // Order sub-type options
  const orderSubTypeOptions = [
    { value: 'N/A', label: 'N/A' },
    { value: 'RESCHEDULE', label: 'Reschedule' },
    { value: 'RELOCATION', label: 'Relocation' }
  ];
  
  // Product type options
  const productTypeOptions = [
    { value: 'UNIFI', label: 'UniFi' },
    { value: 'STREAMYX', label: 'Streamyx' },
    { value: 'FIBRE', label: 'Fibre' }
  ];
  
  // Status options
  const statusOptions = [
    { value: 'NOT COMPLETED', label: 'Not Completed' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'CANCELLED', label: 'Cancelled' }
  ];
  
  // Handle input change
  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };
  
  // Handle building selection
  const handleBuildingChange = (buildingId) => {
    const selectedBuilding = buildingOptions.find(b => b.value === buildingId);
    
    if (selectedBuilding) {
      setFormData({
        ...formData,
        buildingName: buildingId,
        buildingType: selectedBuilding.type || ''
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (onSubmit) {
      onSubmit(formData);
    }
  };
  
  // Format date for input
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    // Convert date strings like "May 10, 2025 10:00 AM" to ISO format for input
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (error) {
      return dateString;
    }
  };
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData
      });
    }
  }, [initialData]);
  
  return (
    <form onSubmit={handleSubmit}>
      {/* ORDER TYPE Section */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-4 text-gray-700 flex items-center">
          <Settings size={18} className="mr-2" /> ORDER TYPE
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormInput
            label="TRBN #"
            name="trbnNo"
            value={formData.trbnNo}
            onChange={(e) => handleChange('trbnNo', e.target.value)}
            required
          />
          
          <Dropdown
            label="Order Type"
            options={orderTypeOptions}
            value={formData.orderType}
            onChange={(value) => handleChange('orderType', value)}
          />
          
          <Dropdown
            label="Order Sub Type"
            options={orderSubTypeOptions}
            value={formData.orderSubType}
            onChange={(value) => handleChange('orderSubType', value)}
          />
          
          <FormInput
            label="Appointment Date/Time"
            name="appointmentDate"
            type="datetime-local"
            value={formatDate(formData.appointmentDate)}
            onChange={(e) => handleChange('appointmentDate', e.target.value)}
            icon={<Calendar size={18} className="text-gray-400" />}
          />
        </div>
        
        <div className="mt-4">
          <Dropdown
            label="Product Type"
            options={productTypeOptions}
            value={formData.productType}
            onChange={(value) => handleChange('productType', value)}
          />
        </div>
      </div>
      
      {/* CUSTOMER INFORMATION Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold mb-4 text-gray-700 flex items-center">
            <User size={18} className="mr-2" /> CUSTOMER INFORMATION
          </h3>
          
          <div>
            <FormInput
              label="Received Date"
              name="receivedDate"
              type="date"
              value={formatDate(formData.receivedDate)}
              onChange={(e) => handleChange('receivedDate', e.target.value)}
              icon={<Calendar size={18} className="text-gray-400" />}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <FormInput
            label="Customer Name"
            name="customerName"
            value={formData.customerName}
            onChange={(e) => handleChange('customerName', e.target.value)}
            required
            icon={<User size={18} className="text-gray-400" />}
          />
          
          <FormInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            required
            icon={<MapPin size={18} className="text-gray-400" />}
          />
          
          <FormInput
            label="Contact #"
            name="contactNo"
            value={formData.contactNo}
            onChange={(e) => handleChange('contactNo', e.target.value)}
            required
            icon={<Phone size={18} className="text-gray-400" />}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <FormInput
            label="Block"
            name="block"
            value={formData.block}
            onChange={(e) => handleChange('block', e.target.value)}
          />
          
          <FormInput
            label="Level"
            name="level"
            value={formData.level}
            onChange={(e) => handleChange('level', e.target.value)}
          />
          
          <FormInput
            label="Unit"
            name="unit"
            value={formData.unit}
            onChange={(e) => handleChange('unit', e.target.value)}
          />
        </div>
      </div>
      
      {/* BUILDING DETAIL Section */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-4 text-gray-700 flex items-center">
          <Building size={18} className="mr-2" /> BUILDING DETAIL
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols