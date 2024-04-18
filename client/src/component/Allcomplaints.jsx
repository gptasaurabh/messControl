import * as React from 'react';
import { Button } from '@mui/material';
// import Button from 'react-bootstrap/Button';
import { useState } from 'react';


export default function Allcomplaints() {
 

  return (
    <div className="container px-4">
      <div className="row gx-5">
        <div className="col" style={{ margin: '4px' }}>
          <div className="p-2 border bg-light compl-num-cont">
            <div className="containt-header">
            </div>
            {/* <div className="contain-complaints">No Complaint's Yet!</div> */}
            <div className='card-holder' style={{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center",gap:"20px"}}>
              <div className="card mb-3" style={{ maxWidth: '23rem', flex: '1 0 45%', backgroundColor: 'rgba(255, 255, 255, 0.5)',backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',borderRadius: '10px',border: '1px solid rgba(255, 255, 255, 0.18)'}} >
                <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: '3', backgroundColor: 'transparent' }}>
                  <p>Title</p>
                  <p>date</p>
                </div>
                <div className="card-body text-success" style={{ overflow: 'scroll', maxHeight: '150px', backgroundColor: 'transparent' }}>
                  <h5 className="card-title">Success card title</h5>
                  <p className="card-text" style={{ overflow: 'hidden' }}>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </p>
                </div>
                <div className="card-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: '3', backgroundColor: 'transparent' }}>
                  <p>Footer</p>
                  <Button style={{ backgroundColor: "lightblue", borderRadius: "10px" }}>
                    delete
                  </Button>
                </div>
              </div>
              
              <div className="card mb-3" style={{ maxWidth: '23rem', flex: '1 0 45%', backgroundColor: 'rgba(255, 255, 255, 0.5)',backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',borderRadius: '10px',border: '1px solid rgba(255, 255, 255, 0.18)'}} >
                <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: '3', backgroundColor: 'transparent' }}>
                  <p>Title</p>
                  <p>date</p>
                </div>
                <div className="card-body text-success" style={{ overflow: 'scroll', maxHeight: '150px', backgroundColor: 'transparent' }}>
                  <h5 className="card-title">Success card title</h5>
                  <p className="card-text" style={{ overflow: 'hidden' }}>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </p>
                </div>
                <div className="card-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: '3', backgroundColor: 'transparent' }}>
                  <p>Footer</p>
                  <Button style={{ backgroundColor: "lightblue", borderRadius: "10px" }}>
                    delete
                  </Button>
                </div>
              </div>

              <div className="card mb-3" style={{ maxWidth: '23rem', flex: '1 0 45%', backgroundColor: 'rgba(255, 255, 255, 0.5)',backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',borderRadius: '10px',border: '1px solid rgba(255, 255, 255, 0.18)'}} >
                <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: '3', backgroundColor: 'transparent' }}>
                  <p>Title</p>
                  <p>date</p>
                </div>
                <div className="card-body text-success" style={{ overflow: 'scroll', maxHeight: '150px', backgroundColor: 'transparent' }}>
                  <h5 className="card-title">Success card title</h5>
                  <p className="card-text" style={{ overflow: 'hidden' }}>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </p>
                </div>
                <div className="card-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: '3', backgroundColor: 'transparent' }}>
                  <p>Footer</p>
                  <Button style={{ backgroundColor: "lightblue", borderRadius: "10px" }}>
                    delete
                  </Button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}