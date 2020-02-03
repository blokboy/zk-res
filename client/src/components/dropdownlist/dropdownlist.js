import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { getAllResolutions } from "../../zkres-utils";


export default function DropDownList({ ...props }) {
  const { heading } = props;
  const [recentResolutions, setRecentResolutions] = useState([]);
  const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
  useEffect(() => {
      const resolutions = getAllResolutions(provider, '0xdA258105Aabe5e69BA768cb64d1F670d4BDB6702');

      if(resolutions) {
          setRecentResolutions(resolutions);
          console.log('resolutions: ', resolutions);
      } else {
          console.log('err retrieving resolutions from contract...');
      }

      return;
  }, []);
  return (
      <div style={{
          "display": "inline-block",
        "width": "400px",
        "margin-top": "10px",
        "margin-right": "8px",
        "background": "#ADD8E6",
        "border-radius": "5px",
        "margin-left": "175px",
      }}>
      <article className="panel is-${color}">
        <p className="panel-heading">
          { heading }
        </p>
        <p className="panel-tabs">
          <a>Public</a>
          <a>Private</a>
        </p>
        <a className="panel-block is-active">
    <span className="panel-icon">
      <i className="fas fa-book" aria-hidden="true"></i>
    </span>
          bulma
        </a>
        <a className="panel-block">
    <span className="panel-icon">
      <i className="fas fa-book" aria-hidden="true"></i>
    </span>
          marksheet
        </a>
        <a className="panel-block">
    <span className="panel-icon">
      <i className="fas fa-book" aria-hidden="true"></i>
    </span>
          minireset.css
        </a>
        <a className="panel-block">
    <span className="panel-icon">
      <i className="fas fa-book" aria-hidden="true"></i>
    </span>
          jgthms.github.io
        </a>
      </article>
      </div>
  );

}

// Prop Types
