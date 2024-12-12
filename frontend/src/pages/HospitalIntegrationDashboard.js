import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HospitalIntegrationDashboard = () => {
    const [hospitals, setHospitals] = useState([]);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    
    const [showModal, setShowModal] = useState(false);
    const [newHospital, setNewHospital] = useState({
        name: '',
        type: '',
        status: '',
        location: '',
    });

    useEffect(() => {
        fetchHospitals();
    }, []);

    const fetchHospitals = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/hospitals/');
            setHospitals(response.data);
            setFilteredHospitals(response.data);
        } catch (error) {
            setError('Failed to fetch hospital data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        filterData(term, filterType, filterStatus);
    };

    const handleFilterType = (e) => {
        const type = e.target.value;
        setFilterType(type);
        filterData(searchTerm, type, filterStatus);
    };

    const handleFilterStatus = (e) => {
        const status = e.target.value;
        setFilterStatus(status);
        filterData(searchTerm, filterType, status);
    };

    const filterData = (term, type, status) => {
        let filtered = hospitals;

        if (term) {
            filtered = filtered.filter((hospital) =>
                hospital.name.toLowerCase().includes(term)
            );
        }

        if (type) {
            filtered = filtered.filter((hospital) => hospital.type === type);
        }

        if (status) {
            filtered = filtered.filter((hospital) => hospital.status === status);
        }

        setFilteredHospitals(filtered);
    };

    const handleAddHospital = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/hospitals/', newHospital);
            setHospitals([...hospitals, response.data]); 
            setFilteredHospitals([...hospitals, response.data]);
            setShowModal(false); // Close the modal
            setNewHospital({ name: '', type: '', status: '', location: '' }); 
        } catch (error) {
            console.error('Error adding hospital:', error);
        }
    };

    if (loading) {
        return <div style={{ padding: '20px' }}>Loading hospitals...</div>;
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                {error}
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Hospital Integration Dashboard</h2>
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}
                >
                    Add Hospital
                </button>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by hospital name"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <select value={filterType} onChange={handleFilterType} style={{ marginRight: '10px', padding: '5px' }}>
                    <option value="">Filter by Type</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="phc">PHC</option>
                </select>
                <select value={filterStatus} onChange={handleFilterStatus} style={{ padding: '5px' }}>
                    <option value="">Filter by Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
            <table style={{ width: '100%', border: '1px solid #ccc', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hospital Name</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredHospitals.map((hospital, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{hospital.name}</td>
                            <td>{hospital.status}</td>
                            <td>{hospital.type}</td>
                            <td>{hospital.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', width: '400px' }}>
                        <h3>Add New Hospital</h3>
                        <input
                            type="text"
                            placeholder="Hospital Name"
                            value={newHospital.name}
                            onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })}
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                        />
                        <select
                            value={newHospital.type}
                            onChange={(e) => setNewHospital({ ...newHospital, type: e.target.value })}
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                        >
                            <option value="">Select Type</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="phc">PHC</option>
                        </select>
                        <select
                            value={newHospital.status}
                            onChange={(e) => setNewHospital({ ...newHospital, status: e.target.value })}
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                        >
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Location"
                            value={newHospital.location}
                            onChange={(e) => setNewHospital({ ...newHospital, location: e.target.value })}
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                        />
                        <button
                            onClick={handleAddHospital}
                            style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
                        >
                            Add
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{ padding: '10px', backgroundColor: '#ccc', color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HospitalIntegrationDashboard;
