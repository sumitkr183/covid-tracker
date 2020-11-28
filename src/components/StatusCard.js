import React from 'react';
import {Card} from 'react-bootstrap';

export default function StatusCard({name,cases,totalCases,textColor}) {
    return (
        <div className="col-md-4">
            <Card style={{borderTop: '5px solid '+textColor}}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle><b style={{color: textColor}}>+{cases}</b></Card.Subtitle>                    
                    <Card.Text>
                        <p>Total : <span>{totalCases}</span></p>
                    </Card.Text>                    
                </Card.Body>
            </Card>
        </div>
    )
}
