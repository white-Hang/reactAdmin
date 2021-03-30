import React, { Component } from 'react'
import {
    Card,
    Button,
    Table
} from "antd"
export default class Role extends Component {
    render() {
        const title=(
            <span>
                <Button></Button>
                <Button></Button>
            </span>
        )
        return (
            <Card title={title}>
                
            </Card>
        )
    }
}
