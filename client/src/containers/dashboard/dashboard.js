import React, { useState } from 'react';
import styled from 'styled-components';
import { Add, Search } from '@material-ui/icons'

const SearchBar = styled.input`
    display: flex;
    width: 400px;
    height: 35px;
    border: 2px solid black;
    border-radius: 25px;
    margin: 0 auto;
    text-align: center;
    outline: none;
    background-color: white;
`;

const AddHashButton = styled.button`
    display: flex;
    position: absolute;
    background-color: lightgreen;
    width: 40px;
    height: 40px;
    border: 1px solid black;
    border-radius: 5px;   
    top: 25px;
    right: 25px;
    cursor: pointer;
    outline: none;
`;

const SearchButtonBitch = styled.button`
    position: absolute;
    display: flex;
    width: 40px;
    height: 28px;
    border: 1px solid black;
    border-radius: 25px;
    background-color: lightgreen;
    margin: 0 auto;
    top: 3.4px;
    right: 476px;
    cursor: pointer;
    outline: none;
`;

function Dashboard({ ...props }) {
    const [bounty, setBounty] = useState(0.00);
    const [resolution, setResolution] = useState('');
    const [search, setSearch] = useState('');

    const closeModal = (e) => {
        e.preventDefault();
        const modal = document.getElementsByClassName('modal is-active');
        modal[0].classList = ['modal'];
        return;
    };

    const openModal = (e) => {
        e.preventDefault();
        const modal = document.getElementsByClassName('modal');
        modal[0].classList = ['modal is-active'];
        return;
    };

    return (
        <section className="hero is-info is-fullheight">
            <div className="hero-body">
                <div className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Add a new resolution</p>
                            <button className="delete" aria-label="close" onClick={(e) => closeModal(e)} />
                        </header>
                        <section className="modal-card-body">
                            <div className="field">
                                <div className="control">
                                    <input className="input is-primary" type="text" placeholder="Bounty (ETH)" onChange={(e) => setBounty(e.target.value)}/>
                                </div>
                            </div>
                            <textarea className="textarea" placeholder="e.g. Hello world" onChange={(e) => setResolution(e.target.value)}>

                            </textarea>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={(e) => console.log('Clicked Hash')}>Add Hash</button>
                            <button className="button" onClick={(e) => closeModal(e)}>Cancel</button>
                        </footer>
                    </div>
                </div>

                <AddHashButton onClick={(e) => openModal(e)}>
                    <Add />
                </AddHashButton>
                <div className="container">
                    <SearchBar onChange={(e) => setSearch(e.target.value)}/>
                    <SearchButtonBitch onClick={(e) => console.log(search)}>
                        <Search />
                    </SearchButtonBitch>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;
