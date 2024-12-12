import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QueueManagement = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/queue/');
            setPatients(response.data);
        } catch (error) {
            setError('Failed to fetch patient data.');
        } finally {
            setLoading(false);
        }
    };

    const admitPatient = async (id) => {
        try {
            await axios.patch(`http://127.0.0.1:8000/api/queue/${id}/`, { queue_status: 'admitted' });
            fetchPatients(); 
        } catch (error) {
            alert('Failed to admit patient.');
        }
    };

    if (loading) return <div>Loading patients...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Queue Management</h2>
            <table style={{ width: '100%', border: '1px solid #ccc', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Symptoms</th>
                        <th>Criticalness</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.name}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.symptoms}</td>
                            <td>{patient.criticalness}</td>
                            <td>{patient.queue_status}</td>
                            <td>
                                {patient.queue_status === 'waiting' && (
                                    <button
                                        onClick={() => admitPatient(patient.id)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#007bff',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Admit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QueueManagement;

