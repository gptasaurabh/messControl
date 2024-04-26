import React from 'react'
import Solvedcomplaints from './Solvedcomplaints'

export default function Adminprofile() {
  return (
    <>
    <div class="container px-4">
          <div class="row gx-5">
            <div class="col" style={{margin:"4px"}}>
              <div class="p-2 border bg-light" className='compl-num-cont-admin'>
                <div className='contain-num-admin'><p>Admin-1</p></div>
              </div>
            </div>
            <div class="col" style={{margin:"4px"}}>
              <div class="p-2 border bg-light" className='compl-num-cont-admin'>
                <div className='contain-num-admin'><p>Email</p></div>
              </div>
            </div>
            <div class="col" style={{margin:"4px"}}>
              <div class="p-2 border bg-light" className='compl-num-cont-admin'>
                <div className='contain-num-admin'><p>Phone</p></div>
              </div>
            </div>
            <div class="col" style={{margin:"4px"}}>
              <div class="p-2 border bg-light" className='compl-num-cont-admin'>
                <div className='contain-num-admin'><p>Hostel</p></div>
              </div>
            </div>
          </div>
        </div>
        <div className='drop-complaint-box'>
            <Solvedcomplaints/>
        </div>
    </>
  )
}
