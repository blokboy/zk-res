import React, { useState, useEffect } from 'react';
import { Favorite } from "@material-ui/icons";
import MetaMaskLoginButton from 'react-metamask-login-button';
import styled, { css } from 'styled-components';
import bulma from 'bulma/css/bulma.css';

export default function Landing({ ...props }) {
    const [hamburger, setHamburger] = useState(false);

    return (
        <section className="hero is-success is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        Zero Knowledge Resolutions
                    </h1>
                    <h2 className="subtitle">
                        Created w/ <Favorite/> by <a href="https://github.com/blokboy" alt="The link to the Github of the creator." target="_blank" >@blokboy</a> & <a href="https://github.com/kfichter" alt="The link to the Github of the creator." target="_blank">@kfichter</a>
                     </h2>
                    <MetaMaskLoginButton onClick={(e) => {
                        e.preventDefault();
                        console.log(e);
                    }}/>
                </div>
            </div>
        </section>
    );
}