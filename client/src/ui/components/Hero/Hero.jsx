import "./Hero.css";

export const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <div className="hero-message">
                    <h1>
                        Find new favorites,
                        <br/>
                        <span>and never miss a show.</span>
                    </h1>
                    <p>
                        Discover new comedians, find local venues, and receive notifications about upcoming shows, ticket sales, and curated recommendations.
                    </p>    
                </div>
                <button id="hero-register-button">Get Started</button>
            </div>
            <div className="hero-animation">
                <div className="hero-animation-col">
                    <div className="hero-animation-image">
                        <img src="https://s1.ticketm.net/dam/a/695/2b6e7653-dec2-4b4f-a858-cbf40f26c695_ARTIST_PAGE_3_2.jpg" alt="Charlie Berens" />
                    </div>
                    <div className="hero-animation-image">
                        <img src="https://s1.ticketm.net/dam/a/a16/d662870c-cd17-4cae-9690-6edc627c0a16_ARTIST_PAGE_3_2.jpg" alt="Tom Segura"/>
                    </div>
                    <div className="hero-animation-image">
                        <img src="https://s1.ticketm.net/dam/a/4ff/f702dc0a-f02e-4ad5-8c78-ab18c737a4ff_ARTIST_PAGE_3_2.jpg" alt="Matt Rife" />
                    </div>
                </div>
                <div className="hero-animation-col">
                    <div className="hero-animation-image">
                        <img src="https://s1.ticketm.net/dam/a/b20/a8f3948b-f433-4090-b048-df31e7d03b20_ARTIST_PAGE_3_2.jpg" alt="Nate Bargatze" />
                    </div>
                    <div className="hero-animation-image">
                        <img src="https://s1.ticketm.net/dam/a/409/532be76a-a643-408a-b031-b577b60a8409_ARTIST_PAGE_3_2.jpg" alt="Kevin Hart"/>
                    </div>
                    <div className="hero-animation-image">
                        <img src="https://s1.ticketm.net/dam/a/8ef/11598d88-900d-4db6-b796-e9e6ef1158ef_ARTIST_PAGE_3_2.jpg" alt="Sebastian Maniscalco" />
                    </div>
                </div>
            </div>
        </div>
    );
}
