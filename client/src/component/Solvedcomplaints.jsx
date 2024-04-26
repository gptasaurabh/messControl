import React from 'react';

// Example of a dynamic data source
const complaintsData = [
  {
    id: 1,
    title: "Noise Complaint",
    date: "2024-04-17",
    content: "There has been a continuous noise issue at night from construction.",
    status: "Solved"
  },
  {
    id: 2,
    title: "Parking Issue",
    date: "2024-04-16",
    content: "Vehicles are being parked in a no-parking zone during weekends.",
    status: "Solved"
  },
  {
    id: 3,
    title: "Garbage Disposal",
    date: "2024-04-15",
    content: "Improper disposal of waste in the public bins located near the subway.",
    status: "Solved"
  }
];

export default function SolvedComplaints() {
  return (
    <div className="container px-4">
      <div className="row gx-5">
        <div className="col" style={{ margin: '4px' }}>
          <div className="p-2 border bg-light">
            <div className="containt-header-admin">
              Solved Complaints
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