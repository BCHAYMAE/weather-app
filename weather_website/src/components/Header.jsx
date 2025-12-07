import React from "react";
import "./header.css";

const Header = () => {
    return(
    <section className="header-section">
        <div>
            <ion-icon name="pin-outline"></ion-icon>
            <span> Oujda, Morocco</span>
        </div>
        <div>
        <ion-icon name="search-outline"></ion-icon>
        <input type="text" placeholder="search here" />
        </div>
    </section>
    )
};

export default Header;