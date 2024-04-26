import { Button } from '@mui/material';
import React from 'react';

// Example of a dynamic data source
const complaintsData = [
  {
    id: 1,
    title: "Parking Issue",
    date: "2024-04-18",
    content: "There is an unauthorized vehicle parked in my assigned spot.",
    status: "Pending"
  },
  {
    id: 2,
    title: "Noise Complaint",
    date: "2024-04-17",
    content: "Loud parties at night are disrupting the neighborhood sleep schedule.",
    status: "Under Review"
  },
  {
    id: 3,
    title: "Maintenance Required",
    date: "2024-04-16",
    content: "The gym equipment in the community center is broken.",
    status: "Reported"
  }
];

export default function SolvedComplaints() {
  return (
    <div className="container px-4">
      <div className="row gx-5">
        <div className="col" style={{ margin: '4px' }}>
          <div className="p-2 border bg-light">
            <div className="containt-header-admin">
              Unsolved Complaints
            </div>
            <div className='card-holder' style={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "20px"
            }}>
              {complaintsData.map((complaint) => (
                <div key={complaint.id} className="card mb-3" style={{
                  maxWidth: '100%',
                  flex: '1 1 300px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.18)'
                }}>
                  <div className="card-header" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: 'transparent'
                  }}>
                    <p>{complaint.title}</p>
                    <p>{complaint.date}</p>
                  </div>
                  <div className="card-body text-success" style={{
                    overflow: 'auto',
                    maxHeight: '150px',
                    backgroundColor: 'transparent'
                  }}>
                    <h5 className="card-title">Success card title</h5>
                    <p className="card-text">
                      {complaint.content}
                    </p>
                  </div>
                  <div className="card-footer" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: 'transparent'
                  }}>
                    <p>{complaint.status}</p>
                    <Button style={{ backgroundColor: "lightblue", borderRadius: "10px" }}>
                      OK
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}