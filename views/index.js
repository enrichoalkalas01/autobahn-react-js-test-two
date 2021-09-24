import '../styles/main.scss'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Chart from './Chart'

export default class App extends React.Component {
    state = {
        JSONData: null,
        ByNumber: 0,
        ListChange: -1,
        TabMenu: 0,
    }

    componentDidMount() {
        Axios('/chart-data').then(response => {
            this.setState({ JSONData: response.data })
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        // console.log(this.state.JSONData)
    }

    SetTabMenu = (e) => { this.setState({ TabMenu: Number(e.target.getAttribute('value')) }) }
    SetListChange = (e) => { this.setState({ ListChange: Number(e.target.value) }) }
    SetByNumber = (e) => { this.setState({ ByNumber: Number(e.target.value) }) }

    render() {
        return(
            <section id="app-test">
                <div className="main-content">
                    <div className="box-content title">
                        <div className="content title-box">
                            <h1>Vulnerability Data</h1>
                        </div>
                    </div>
                    <div className="box-content">
                        <div className="wrapper-content left">
                            <div className="content menu-box">
                                <ul>
                                    { 
                                        this.state.JSONData ? 
                                            this.state.JSONData.map((data, index) => {
                                                return(
                                                    <li className={ index === this.state.TabMenu ? "menu active" : "menu" }
                                                        key={ index }
                                                        onClick={ this.SetTabMenu }
                                                        value={ index }
                                                    >
                                                        { `Tab #${ index + 1 }` }
                                                    </li>
                                                )
                                            })
                                        : null
                                    }
                                </ul>
                            </div>
                            <div className="content content-data">
                                <h1>This graphs show that : </h1>
                                <div className="content-box">
                                    {
                                        this.state.JSONData ?
                                            this.state.JSONData[this.state.TabMenu].bullets.map((data, index) => {
                                                return(
                                                    <div 
                                                        className="wrapper-content-d"
                                                        key={ index }
                                                    >
                                                        <div className="icon-box">
                                                            <i className={ `fas ${ data.icon }` }></i>
                                                        </div>
                                                        <div className="desc-box">
                                                            <div dangerouslySetInnerHTML={{ __html: data.text }} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="wrapper-content right">
                            <div className="content cart-box">
                                <h4>{ `Chart ${ this.state.TabMenu + 1 }` }</h4>
                                <Chart
                                    DataChart={ this.state.JSONData ? this.state.JSONData[this.state.TabMenu] : null }
                                />
                            </div>
                            <div className="content list-box">
                                <div className="wrapper-one">
                                    <select onChange={ this.SetListChange }>
                                        <option value={ -1 }>Show All Data</option>
                                        {
                                            this.state.JSONData ?
                                                this.state.JSONData[this.state.TabMenu].list.map((data, index) => {
                                                    return(
                                                        <option key={ index } value={ index }>{ data.name }</option>     
                                                    )
                                                })
                                            : null
                                        }
                                    </select>
                                </div>
                                <div className="wrapper-two">
                                    <label>With a score above</label>
                                    <input 
                                        type="number"
                                        placeholder="change by number.."
                                        onChange={ this.SetByNumber }
                                    />
                                </div>
                            </div>
                            <div className="content list-wrapper-box">
                                <table>
                                    <thead>
                                        <tr className="head">
                                            <td>Name</td>
                                            <td>Score</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.JSONData ? 
                                                // If list change and number is empty
                                            ( this.state.ListChange >= 0 && this.state.ByNumber === 0 ) || ( this.state.ListChange >= 0 && this.state.ByNumber !== 0 )  ?
                                            // 'list change but this.state.Bynumber empty'
                                            this.state.ListChange >= 0 ? 
                                                // list change but by number not change
                                                this.state.ByNumber === 0 ?
                                                    <tr className="data-list">
                                                        <td>{ this.state.JSONData[this.state.TabMenu].list[this.state.ListChange].name }</td>
                                                        <td>{ this.state.JSONData[this.state.TabMenu].list[this.state.ListChange].score }</td>
                                                    </tr>
                                                :
                                                // List change but by number change
                                                this.state.JSONData[this.state.TabMenu].list.map((data, index) => {
                                                    if ( Number(data.score) === Number(this.state.ByNumber) ) {
                                                        return(
                                                            <tr key={ index } className="data-list">
                                                                <td>{ data.name }</td>
                                                                <td>{ data.score }</td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            :
                                                this.state.JSONData[this.state.TabMenu].list.map((data, index) => {
                                                    return(
                                                        <tr key={ index } className={
                                                            index !== ( this.state.JSONData[this.state.TabMenu].list.length - 1) ?
                                                            "data-list" : "data-list last-child"
                                                        }>
                                                            <td>{ data.name }</td>
                                                            <td>{ data.score }</td>
                                                        </tr>
                                                    )
                                                })
                                                
                                        :
                                            // this.state.ByNumber change but list not change
                                            this.state.ByNumber !== 0 ? 
                                                // 'by number change'
                                                this.state.JSONData[this.state.TabMenu].list.map((data, index) => {
                                                    if ( Number(data.score) === Number(this.state.ByNumber) ) {
                                                        return(
                                                            <tr key={ index } className="data-list">
                                                                <td>{ data.name }</td>
                                                                <td>{ data.score }</td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                                
                                            :
                                                // 'list not change but this.state.Bynumber not change'
                                                this.state.JSONData[this.state.TabMenu].list.map((data, index) => {
                                                    return(
                                                        <tr key={ index } className={
                                                            index !== ( this.state.JSONData[this.state.TabMenu].list.length - 1) ?
                                                            "data-list" : "data-list last-child"
                                                        }>
                                                            <td>{ data.name }</td>
                                                            <td>{ data.score }</td>
                                                        </tr>
                                                    )
                                                })
                                            : null
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

