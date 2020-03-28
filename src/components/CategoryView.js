import React, { Component } from 'react'

export default class CategoryView extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            currentIndex: 0,

        }
        console.log(this.props);
    }
    render() {
        const item = this.props.categories[this.props.currentIndex];
        return (
            <div style={{marginTop: 30, textAlign: "center"}}>
                <img style={{width: 500, height: 500}}src={item.image}/>
                <h1>
                    {item.name}
                </h1>
            </div>
        )
    }
}
