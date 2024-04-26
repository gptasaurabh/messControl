import React from 'react'
import Dropcomplaint from './Dropcomplaint'
export default function Dashboard() {
  
  return (
    <>
    <div class="container px-4">
          <div class="row gx-5">
            <div class="col" style={{margin:"4px"}}>
              <div class="p-2 border bg-light" className='compl-num-cont'>
                <div className="containt-header">Total complaints</div>
                <div className='contain-num'>000</div>
              </div>
            </div>
            <div class="col" style={{margin:"4px"}}>
              <div class="p-2 border bg-light" className='compl-num-cont'>
                <div className="containt-header">Solved complaints</div>
                <div className='contain-num'>000</div>
              </div>
            </div>
            <div class="col" style={{margin:"4px"}}>
              <div class="p-2 border bg-light" className='compl-num-cont'>
                <div className="containt-header">Y/'s Complaints</div>
                <div className='contain-num'>000</div>
              </div>
            </div>
            <div class="col" style={{margin:"4px"}}>
              <div class="p-2 border bg-light" className='compl-num-cont'>
                <div className="containt-header">Y/'s solved Complaints</div>
                <div className='contain-num'>000</div>
              </div>
            </div>
          </div>
        </div>
        <div className='drop-complaint-box'>
            <Dropcomplaint/>
        </div>
    </>
  )
}
