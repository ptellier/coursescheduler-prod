import React from 'react'

interface IProps {
    classType: string
    courseNumber?: string
}

export default function ClassInfo({ classType, courseNumber}: IProps) {
    return (
        <div style={{ display: 'flex', paddingBottom: '0.5rem', fontSize: '0.8rem' }}>
            <div className="leftBox" style={{ width: '50%' }}>
                <div>
                    <b>
                        {classType}: {courseNumber}
                    </b>
                </div>
                <div>Method: </div>
            </div>
            <div className="rightBox" style={{ textAlign: 'left' }}>
                <div>Day: </div>
                <div>Time: </div>
            </div>
        </div>
    )
}
