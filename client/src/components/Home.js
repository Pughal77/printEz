function Home() {
    const handleClick = (e) => {
        e.preventDefault()
        console.log('hi')
    }

    return ( 
        <nav className="home">
            <h1>WELCOME TO PRINTEZ</h1>
            <div className="links">
                <a href="/login" onClick={handleClick}>log in</a>
            </div>
        </nav>
     );
}
 
export default Home;