import {  TSchedule } from "../modules/offeredCourse/offeredCourse.interface"



export const hasTimeConflict = (assignedSchedules: TSchedule[], newSchedules: TSchedule) => {
    

    for (const schedule of assignedSchedules) {
        
            const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`)
            const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`)
            const newStartTime = new Date(`1970-01-01T${newSchedules.startTime}`)
            const newEndTime = new Date(`1970-01-01T${newSchedules.endTime}`)
            
            //existing time   10:30 - 12:30
            //newCreated time 11:30 - 1:30
            if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
               return true
            }
    
       
    }
    
    
    return false
}